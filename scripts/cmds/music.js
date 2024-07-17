const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports = {
 config: {
 name: "sing",
 version: "1.3",
 author: "JARiF",
 countDown: 5,
 role: 0,
 category: "cute",
 },

 onStart: async function ({ api, event, message }) {
 try {
 if (event.type === "message_reply" && ["audio", "video"].includes(event.messageReply.attachments[0].type)) {
 const attachmentUrl = event.messageReply.attachments[0].url;
 const originalMessage = await message.reply(`Searching for the song...`);
 const searchResults = await yts(attachmentUrl);

 if (!searchResults.videos.length) {
 return message.reply("Error: Song not found.");
 }

 const video = searchResults.videos[0];
 const videoUrl = video.url;
 const stream = ytdl(videoUrl, { filter: "audioonly" });
 const fileName = `music.mp3`;
 const filePath = `${__dirname}/tmp/${fileName}`;

 stream.pipe(fs.createWriteStream(filePath));

 stream.on('response', () => {
 console.info('[DOWNLOADER]', 'Starting download now!');
 });

 stream.on('info', (info) => {
 console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
 });

 stream.on('end', async () => {
 console.info('[DOWNLOADER] Downloaded');
 if (fs.statSync(filePath).size > 87380608) {
 fs.unlinkSync(filePath);
 return message.reply('[ERR] The file could not be sent because it is larger than 83mb.');
 }
 const replyMessage = {
 body: `╭── 🎶 Title ────⊰\n${video.title}`,
 attachment: fs.createReadStream(filePath),
 };
 await api.unsendMessage(originalMessage.messageID);
 await message.reply(replyMessage, event.threadID, () => {
 fs.unlinkSync(filePath);
 });
 });
 } else {
 const input = event.body;
 const text = input.substring(12);
 const data = input.split(" ");

 if (data.length < 2) {
 return message.reply("Please put a song");
 }

 data.shift();
 const song = data.join(" ");
 const originalMessage = await message.reply(`✅ | 𝖲𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝗆𝗎𝗌𝗂𝖼 𝖿𝗈𝗋 "${song}"...`);
 const searchResults = await yts(song);

 if (!searchResults.videos.length) {
 return message.reply("Error: Invalid request.");
 }

 const video = searchResults.videos[0];
 const videoUrl = video.url;
 const stream = ytdl(videoUrl, { filter: "audioonly" });
 const fileName = `music.mp3`;
 const filePath = `${__dirname}/tmp/${fileName}`;

 stream.pipe(fs.createWriteStream(filePath));

 stream.on('response', () => {
 console.info('[DOWNLOADER]', 'Starting download now!');
 });

 stream.on('info', (info) => {
 console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
 });

 stream.on('end', async () => {
 console.info('[DOWNLOADER] Downloaded');
 if (fs.statSync(filePath).size > 26214400) {
 fs.unlinkSync(filePath);
 return message.reply('[ERR] The file could not be sent because it is larger than 25MB.');
 }
 const replyMessage = {
 body: `╭── 🎶 Title ────⊰\n${video.title}`,
 attachment: fs.createReadStream(filePath),
 };
 await api.unsendMessage(originalMessage.messageID);
 await message.reply(replyMessage, event.threadID, () => {
 fs.unlinkSync(filePath);
 });
 });
 }
 } catch (error) {
 console.error('[ERROR]', error);
 message.reply("This song is not available.");
 }
 },
};