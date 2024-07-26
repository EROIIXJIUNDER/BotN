.cmd install draw.js const axios = require('axios');
const fs = require('fs');
const path = require('path');
const badWords = ["sex", "hentai", "pussy", "dick", "xxx", "porn", "nude", "sexy", "🍑", "🔞", "👅", "🫦", "💋", "🔥", "🤒", "🥵", "🤭", "puti", "lado", "ass", "fuck", "suck", "puti", "breast", "dickless", "kera", "vagina", "fanny", "banana", "🍌", "hot", "tits", "boobs", "xnxx", "🥒", "🩸", "🤤", "cucumber", "🖕"]; // Add your actual bad words here

module.exports = {
  config: {
    name: "draw",
    version: "1.1",
    author: "MICRON",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "ai",
    guide: {
      en: `{pn} your prompt `
    }
  },
  onStart: async function({ message, api, args, event }) {
    const prompt = args.join(' ');

    if (!prompt) {
      return message.reply("Please provide a prompt.");
    }

    const words = prompt.split(/[\s,]+/);
    const bannedWord = words.find(word => badWords.includes(word.toLowerCase()));
    if (bannedWord) {
      return message.reply(`Sorry, but you are not allowed to use the word "${bannedWord}".`);
    }

    const baseURL = 'https://api.creartai.com/api/v1/text2image';
    
    const formattedText = `*Prompt:* _${prompt}_`;

    const options = {
      method: 'POST',
      url: baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({
        prompt: prompt,
        negative_prompt: ',malformed hands,malformed fingers,malformed faces,malformed body parts,mutated body parts,malfromed eyes,mutated fingers,mutated hands,realistic,worst quality, low quality, blurry, pixelated, extra limb, extra fingers, bad hand, text, name, letters, out of frame, lowres, text, error, cropped, jpeg artifacts, ugly, duplicate, morbid, mutilated, out of frame, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username,',
        aspect_ratio: '3x3',
        num_outputs: '',
        num_inference_steps: '',
        controlnet_conditioning_scale: 0.5,
        guidance_scale: '5.5',
        scheduler: '',
        seed: ''
      })
    };

    try {
      api.setMessageReaction("⏳", event.messageID, () => {}, true);
      
      const generatingMessage = await message.reply("");

      const response = await axios(options);
      const imageData = response.data.image_base64;
      const imageBuffer = Buffer.from(imageData, 'base64');
      const tmpDir = path.join(__dirname, 'tmp');
      const imagePath = path.join(tmpDir, `${Date.now()}.jpg`);

      // Ensure the 'tmp' directory exists
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }

      fs.writeFileSync(imagePath, imageBuffer);

      await message.reply({
        attachment: fs.createReadStream(imagePath),
        body: formattedText
      });

      fs.unlinkSync(imagePath);

      // Delete the "Generating" message after sending the photo
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.unsendMessage(generatingMessage.messageID);
    } catch (error) {
      console.error(error);
      message.reply("❌ Failed to generate the image. Please try again later.");
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  }
}
