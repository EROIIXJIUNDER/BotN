module.exports = {
  config: {
    name: "groupstats",
    aliases: [], 
    version: "1.1.0",
    author: "August Quinn",
    countDown: 20,
    role: 0,
    description: {
        en: "Get information about the current group chat."
    }, 
    category: "Info", 
    guide: {
      en: "To use this command, type {pn} to show the current group chat groupstats."
    } 
  },
  
  onStart: async function({ message, event, api }) {
      try {
          const threadInfo = await api.getThreadInfo(event.threadID);
          const threadName = threadInfo.threadName || "Unnamed Thread";
          const threadType = threadInfo.isGroup ? "Group" : "Personal Chat";
          const participantCount = threadInfo.participantIDs.length;
          
          const groupID = threadInfo.isGroup ? `\n❒ Group ID: ${event.threadID}` : "";
          const groupStatus = threadInfo.isGroup ? `\n❒ Group Status: ${threadInfo.approvalMode ? "Approval Mode On" : "Approval Mode Off"}${threadInfo.restrictions ? `\n❒ Group Issues: ${threadInfo.restrictions}` : ""}` : "";
          
          const adminIDs = threadInfo.adminIDs || [];
          const nicknames = await Promise.all(threadInfo.participantIDs.map(async (userID) => {
              const userInfo = await api.getUserInfo(userID);
              return `• ${userInfo[userID].name}\n- ${userID}`;
          }));
          
          const infoMessage = `Hello ${threadName}\n\n` + 
          `ℹ️ | ${threadName}'s Information\n\n` + 
          `❒ 𝗡𝗔𝗠𝗘: ${threadName}\n` + 
          `❒ 𝗧𝗬𝗣𝗘: ${threadType}${groupID}${groupStatus}\n` + 
          `❒ 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗦: ${participantCount}\n` + 
          `❒ 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗦:\n` + 
          ` ${nicknames.join("\n")}`;
          
          message.reply(infoMessage);
      } catch (error) {
          console.error("Error fetching thread information:", error);
          message.reply("❎ Error fetching thread information. Please try again later.");
      }
  }
};
