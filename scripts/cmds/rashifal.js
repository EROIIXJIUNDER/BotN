const axios = require('axios');

module.exports = {
  config: {
    name: "rashifal",
    aliases: ["rashi"],
    version: "1.1",
    author: "OtinXSandip",
    countDown: 10,
    role: 0,
    longDescription:  "rashifal",
    category: "ai",
    guide: {
      en: '{pn}'
    }
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    try {
      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      const response = await axios.get(`https://asmit-docs.onrender.com/rashifal`);
      api.setMessageReaction("✅", event.messageID, () => {}, true);

      const predictions = response.data;

      let signsMessage = "Here are the Sun Signs:";
      for (let i = 0; i < predictions.length; i++) {
        signsMessage += `\n${i + 1}. ${predictions[i].sunsign}`;
      }


      message.reply({
        body: `${signsMessage}\n\nPlease reply with the image number (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12)`,
      }, async (err, info) => {
        let id = info.messageID;
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          predictions: predictions,
        });
      });
    } catch (error) {
      console.error(error);
      api.sendMessage(`Error: ${error}`, event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply, usersData, args, message }) {
    const reply = parseInt(args[0]);
    const { author, messageID, predictions } = Reply;

    if (event.senderID !== author) return;

    try {
      if (reply >= 1 && reply <= 12) {
        const lado = predictions[reply - 1].prediction;
        message.reply(`Prediction for Sun Sign ${predictions[reply - 1].sunsign}:\n${lado}`);
      } else {
        message.reply("Invalid  number Please reply with a number between 1 and 12");
        return;
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(`Error: ${error}`, event.threadID);
    }

    message.unsend(Reply.messageID);
  },
};
