module.exports = {
 config: {
 name: "convosticker",
 version: "1.0",
 author: "Asmit",
 countDown: 5,
 role: 0,
 shortDescription: "convo2",
 longDescription: "Fb group name& sticker convo",
 category: "reply",
 },
 onStart: async function() {},
 onChat: async function({
 event,
 message,
 getLang
 }) {
 if (event.body && event.body.toLowerCase() == "convo2") {
 return message.reply("https://sticker-namechanger.vercel.app/");
 }
 }
};