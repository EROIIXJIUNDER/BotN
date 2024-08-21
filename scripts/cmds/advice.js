const axios = require('axios');
const srod = require('srod-v2');
const fs = require('fs-extra'); 

const pathFile = __dirname + 'advice.txt';
if (!fs.existsSync(pathFile)) { fs.writeFileSync(pathFile, 'en'); }
module.exports = {
  config: {
    name: 'advice',
    version: '1.0',
    author: 'Ace',
    countDown: 5,
    role: 0,
    description: {
      en: 'Get a random advice.',
    },
    category: '𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡',
    guide: {
      en: '{pn} - Get random advice',
    },
  },

  onStart: async function ({ api, event, args, message }) {
      if (args[0] === 'english') { 
         fs.writeFileSync(pathFile, 'en'); 
         message.reply('Advice language set to English'); 
      } 
      else if (args[0] === 'tagalog') { 
         fs.writeFileSync(pathFile, 'tl'); 
         message.reply('Lengwahe ng Advice ay naset sa Tagalog');
      } /*else { 
         message.reply(`Invalid Args: Only \'English\' and \'Tagalog\'`); 
      }*/ 
      if (!args[0]) {
        try {
      const adviceResult = await srod.GetAdvice();
      const advice = adviceResult.embed.description;

      let translatedAdvice = await translateAdvice(advice);

      let messageToSend = `𝗔𝗞𝗜𝗥𝗔~𝗔𝗜 ( 𝗔𝗗𝗩𝗜𝗖𝗘 ): \n\n${translatedAdvice}`;

      return api.sendMessage(messageToSend, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
    }
   }
  },
};

async function translateAdvice(advice) {
  try {
    const tl = fs.readFileSync(pathFile, 'utf-8'); 
    
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${tl}&dt=t&q=${encodeURIComponent(advice)}`
    );
    const translations = response.data[0];
    const translatedAdvice = translations.reduce((accumulator, translation) => {
      if (translation[0]) {
        accumulator += translation[0];
      }
      return accumulator;
    }, '');
    return translatedAdvice;
  } catch (error) {
    console.error(error);
    return 'Error getting an advice.';
  }
}
