const axios = require('axios');

const ArYAN = [
 'bard',
];

module.exports = {
 config: {
 name: 'bard',
 version: '1.0.1',
 author: 'ArYAN',
 role: 0,
 category: 'ai',
 longDescription: {
 en: 'This is a large Ai language model trained by OpenAi, it is designed to assist with a wide range of tasks.',
 },
 guide: {
 en: 'bard what is capital of France?',
 },
 },

 langs: {
 en: {
 final: "",
 loading: '𝖠𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...'
 }
 },

 onStart: async function () {},
 onChat: async function ({ api, event, args, getLang, message }) {
 try {
 const prefix = ArYAN.find((p) => event.body && event.body.toLowerCase().startsWith(p));

 if (!prefix) {
 return;
 }

 const prompt = event.body.substring(prefix.length).trim();

 const loadingMessage = getLang("loading");
 const loadingReply = await message.reply(loadingMessage);
 
 const response = await axios.get(`https://king-aryanapis.onrender.com/api/bard?prompt=${encodeURIComponent(prompt)}`);

 if (response.status !== 200 || !response.data || !response.data.answer) {
 throw new Error('Invalid or missing response from API');
 }

 const messageText = response.data.answer; 

 const finalMsg = `${messageText}`;
 api.editMessage(finalMsg, loadingReply.messageID);

 console.log('Sent answer as a reply to user');
 } catch (error) {
 console.error(`Failed to get answer: ${error.message}`);
 api.sendMessage(
 `${error.message}.`,
 event.threadID
 );
 }
 }
};
