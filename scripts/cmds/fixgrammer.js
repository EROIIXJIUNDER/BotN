module.exports = {
  config: {
    name: "fixgrammar",
    aliases: ["fixgram", "gram", "grammar"],
    version: "1.4",
    author: "dain | jvb",
    countDown: 10,
    role: 0, 
    description: {
      en: "Fixes your embarrassing grammar."
    },
    category: "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡",
    guide: {
      en: "{pn} [content]"
    }
  },

  onStart: async function ({ args, message }) {
    const axios = require("axios");
    const prefix = global.GoatBot.config.prefix;
    const commandName = this.config.name;
    const pn = prefix + commandName;
    const jvb = args.join(" ").trim();

    if (!jvb) {
      return message.reply(`❌ Wrong Format\nUse: ${pn} [content]`);
    }

    try {
      const res = await axios.get(`https://ai-chat-gpt-4-lite.onrender.com/api/hercai?question=fix%20grammar%20"${jvb}"%20and%20put%20the%20corrected%20grammar%20inside%20the%20["%20"].%20`);
      const { reply } = res.data;
      message.reply(`📜 Correct Paragraph:\n\n${reply}`);
    } catch (error) {
      console.error(error);
      message.reply("❌ An error occurred: "+ error);
    }
  }
};
