const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");

const sentVideos = [];

module.exports = {
  config: {
    name: "page2",
    aliases: ["p2"],
    version: "1.0",
    author: "kshitiz",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "Get a random video from the fb page",
    category: "page",
    guide: "{p}{n}",
  },

  onStart: async function ({ api, event, args }) {
    try {
      const loadingMessage = await api.sendMessage("भिडियो आउँदै छ रूक 😙💗", event.threadID);

      const pageId = "filo065"; // Replace with the ID or username of the Facebook page 
      const accessToken = "EAAD6V7os0gcBO29qI1SswcMAcQ9j1sYPZCPAb9OmM7qQhXZC2COZBgk4COYImaCV6ICanLqRdxgUDDQyrzekjrZC1UJxDUHMZBzue7Tj5xSH2XLNNewHoRQM945ZCvZBedk3zJDXcjnpgzwYr09u6GQ4HyrZAsASGRTs4PEM4n9xuIrpfPFjW6m3mhln0mvtFKCh4AZDZD";// use your EAAD6V7 token

      const response = await axios.get(`https://graph.facebook.com/${pageId}/videos?access_token=${accessToken}`);
      const videos = response.data.data;

      if (videos.length > 0) {
        const unsentVideos = videos.filter(video => !sentVideos.includes(video.id));

        if (unsentVideos.length === 0) {
          await api.sendMessage("All videos from the page have been sent before.", event.threadID);
        } else {
          const randomVideo = unsentVideos[Math.floor(Math.random() * unsentVideos.length)];
          const videoLink = randomVideo.source;
          const videoId = randomVideo.id;

          const tempDir = path.join(os.tmpdir(), "fb_videos");
          if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
          }

          const randomFileName = `video_${Date.now()}.mp4`;
          const filePath = path.join(tempDir, randomFileName);

          const videoResponse = await axios({
            method: "GET",
            url: videoLink,
            responseType: "stream",
          });

          videoResponse.data.pipe(fs.createWriteStream(filePath));

          videoResponse.data.on("end", async () => {
            if (fs.existsSync(filePath)) {
              await api.sendMessage(
                {
                  body: "Random video from the page:",
                  attachment: fs.createReadStream(filePath),
                },
                event.threadID
              );
              sentVideos.push(videoId);
            } else {
              console.error("File does not exist:", filePath);
              await api.sendMessage("An error occurred while fetching the video. Please try again later.", event.threadID);
            }

          
            api.unsendMessage(loadingMessage.messageID);
          });

          videoResponse.data.on("error", async (err) => {
            console.error("Error during video download:", err);
            await api.sendMessage("An error occurred while fetching the video. Please try again later.", event.threadID);

           
            api.unsendMessage(loadingMessage.messageID);
          });
        }
      } else {
      
        await api.sendMessage("No videos found.", event.threadID);

      
        api.unsendMessage(loadingMessage.messageID);
      }
    } catch (error) {
      console.error("Error retrieving videos:", error);
     
      await api.sendMessage("An error occurred while retrieving videos.", event.threadID);
    }
  },
};
