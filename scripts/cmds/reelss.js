const axios = require("axios");
const fs = require("fs");
const path = require("path");

const usernames = [
  "yskbvxz",
  "icyw3ird_",
  "prayaimcrestha",
  "lets.archive.together",
  "feelanshul",
  "meouw_01",
  "hearthub.us",
  "deadchuckie",
  "primis_chacha",
  "theycallme_sandipeyyy",
  "abiralshresthaa",
  "anup.10_",
  "manthan_khatri2205",
  "washbish65",
];

const autoSendStatus = {}; // Object to keep track of auto-send status for each thread
const autoSendIntervals = {}; // Object to keep track of intervals for each thread

const paginationTokens = [
  // don't add pagination token if you are using multiple usernames.
];

module.exports = {
  config: {
    name: "reelss",
    aliases: ["rr"],
    author: "Vex_Kshitiza",
    version: "13.0",
    cooldowns: 5,
    role: 0,
    shortDescription: "Get status video from Instagram user",
    longDescription: "Get status video from a specified Instagram user.",
    category: "utility",
    guide: "{p}s\n{s} on - Turn on auto-sending\n{s} off - Turn off auto-sending",
  },

  onStart: async function ({ api, event, args, message }) {
    const threadID = event.threadID;

    if (args[0] === "on") {
      autoSendStatus[threadID] = true;
      message.reply("Auto-send is now ON for this thread.");
      startAutoSend({ api, event, message, threadID });
    } else if (args[0] === "off") {
      autoSendStatus[threadID] = false;
      clearInterval(autoSendIntervals[threadID]);
      message.reply("Auto-send is now OFF for this thread.");
    } else {
      await sendReel({ api, event, message });
    }
  }
};

async function sendReel({ api, event, message }) {
  api.setMessageReaction("", event.messageID, (err) => {}, true);

  try {
    let username, token, apiUrl;

    if (paginationTokens.length > 0) {
      const randomUsernameIndex = Math.floor(Math.random() * usernames.length);
      const randomTokenIndex = Math.floor(Math.random() * paginationTokens.length);
      username = usernames[randomUsernameIndex];
      token = paginationTokens[randomTokenIndex];
      apiUrl = `https://insta-scrapper-kappa.vercel.app/kshitiz?username=${username}&token=${token}`;
    } else {
      const randomUsernameIndex = Math.floor(Math.random() * usernames.length);
      username = usernames[randomUsernameIndex];
      apiUrl = `https://insta-scrapper-kappa.vercel.app/kshitiz?username=${username}`;
    }

    const apiResponse = await axios.get(apiUrl);
    const videoURL = apiResponse.data.videoURL;
    const videoResponse = await axios.get(videoURL, { responseType: "stream" });

    const tempVideoPath = path.join(__dirname, "cache", `insta_video.mp4`);
    const writer = fs.createWriteStream(tempVideoPath);
    videoResponse.data.pipe(writer);

    writer.on("finish", async () => {
      const stream = fs.createReadStream(tempVideoPath);

      message.reply({
        body: "",
        attachment: stream,
      });

      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    });
  } catch (error) {
    console.error(error);
    message.reply("Sorry, an error occurred.");
  }
}

function startAutoSend({ api, event, message, threadID }) {
  autoSendIntervals[threadID] = setInterval(() => {
    if (autoSendStatus[threadID]) {
      sendReel({ api, event, message });
    }
  }, 60000); // auto-send every 60 seconds, adjust as needed
  }
