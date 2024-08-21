const axios = require("axios");

module.exports = {
  config: {
    name: "define",
    //aliases: ['define'],
    version: "1.0.0",
    author: "August Quinn | AceGerome",
    countDown: 15,
    role: 0,
    description: {
        en: "Retrieve definitions and meanings of English words."
    }, 
    category: "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡", 
    guide: {
      en: "   {pn} <word>"
    } 
  },
  
  onStart: async function({ args, message }) {
  
  if (args.length < 1) {
    return message.reply("Please provide a word to look up.");
  }

  const word = args[0];

  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const entry = response.data[0];

    const meanings = entry.meanings.map((meaning) => {
      const partOfSpeech = meaning.partOfSpeech;
      const definitions = meaning.definitions.map((definition) => `  ⌲ ${definition.definition}`).join("\n");
      return `❑ ${partOfSpeech}\n${definitions}`;
    }).join("\n\n");

    let msg = `𝗪𝗢𝗥𝗗: ${entry.word}\n`;

    if (entry.phonetics && entry.phonetics.length > 0) {
      msg += `𝗣𝗛𝗢𝗡𝗘𝗧𝗜𝗖: ${entry.phonetics[0].text}\n`;
      if (entry.phonetics[0].audio) {
        msg += `𝗔𝗨𝗗𝗜𝗢: ${entry.phonetics[0].audio}\n`;
      }
    }

    if (entry.origin) {
      msg += `𝗢𝗥𝗜𝗚𝗜𝗡: ${entry.origin}\n`;
    }

    if (meanings) {
      msg += `\n𝗠𝗘𝗔𝗡𝗜𝗡𝗚𝗦\n${meanings}`;
    } else {
      msg += "No meanings found.";
    }

    message.reply(msg);
  } catch (error) {
    message.reply("Word not found or an error occurred.");
  }
 }
};
