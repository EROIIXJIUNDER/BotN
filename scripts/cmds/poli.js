const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "poli",
    version: "1.0",
    author: "AceGerome",
    countDown: 20,
    description: {
      en: "Make images from yours prompts."
    },
    category: "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡",
    role: 0,
    guide: {
      en: "{pn} prompt",
    }
  },

  onStart: async function({ message, event, args }) {
      const {
          writeFileSync, 
          unlinkSync, 
          createReadStream
      } = fs;
      let query = args.join(" ")
      
      if (!query) return message.reply("Please enter prompts");
      
      let path = __dirname + `/tmp/poli.png`;
      const poli = (await axios.get(`https://image.pollinations.ai/prompt/${query}`, {
          responseType: "arraybuffer", 
      })).data;
      writeFileSync(path, Buffer.from(poli, "utf-8"));
      message.reply({
          body: "Here's your generated prompt using pollinations.ai!", 
          attachment: createReadStream(path)
      }, () => unlinkSync(path));
   }
};
