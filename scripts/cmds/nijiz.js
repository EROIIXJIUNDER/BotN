const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
    config: {
        name: "nijiz",
        aliases: ["nijijourneyz"],
        version: "1.0",
        author: "rehat--",
        countDown: 5,
        role: 0,
        longDescription: "Text to Image",
        category: "ai",
        guide: {
         en: `{pn} <prompt> --ar [ratio], [preset], [style], or reply to an image\n\nAvailable Styles:\n1. Cinematic\n2. Photographic\n3. Anime\n4. Manga\n5. Digital Art\n6. Pixel Art\n7. Fantasy Art\n8. Neon Punk\n9. 3D Model\n\nAvailable Presets:\n1. Standard v3.0\n2. Standard v3.1\n3. Light v3.1\n4. Heavy v3.1`,
        }
    },        

    onStart: async function({ api, args, message, event }) {
        try {
            let prompt = "";
            let preset = "";
            let style = "";
            let aspectRatio = "1:1"; 

            const aspectIndex = args.indexOf("--ar");
            if (aspectIndex !== -1 && args.length > aspectIndex + 1) {
                aspectRatio = args[aspectIndex + 1];
                args.splice(aspectIndex, 2); 
            }

            const presetIndex = args.indexOf("preset");
            if (presetIndex !== -1 && args.length > presetIndex + 1) {
                preset = args[presetIndex + 1];
                args.splice(presetIndex, 2); 
            }

            const styleIndex = args.indexOf("style");
            if (styleIndex !== -1 && args.length > styleIndex + 1) {
                style = args[styleIndex + 1];
                args.splice(styleIndex, 2); 
            }

            if (args.length === 0) {
                message.reply("Please provide a prompt.");
                return;
            }

            if (args.length > 0) {
                prompt = args.join(" ");
            }

            const apiUrl = `https://api-rehatdesu.onrender.com/api/imagine/nijiv2?prompt=${encodeURIComponent(prompt)}&preset=${encodeURIComponent(preset)}&style=${encodeURIComponent(style)}&aspectRatio=${encodeURIComponent(aspectRatio)}&apikey=gaysex`;
            const processingMessage = await message.reply("Please wait...⏳");
            const response = await axios.post(apiUrl);
            const img = response.data.url;

            await api.sendMessage({
                attachment: await getStreamFromURL(img)
            }, event.threadID, event.messageID);

        } catch (error) {
            console.error(error);
            message.reply("An error occurred.");
        }
    }
};
