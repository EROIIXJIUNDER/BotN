const { getStreamFromURL } = global.utils;
module.exports = {
  config: {
    name: "pair",
    aliases: ['p'],
    version: "1.0",
    author: "Rulex-al LOUFI",
    countDown: 50,
    shortDescription: {
      en: "pair with random people ",
      vi: ""
    },
    category: "fun",
    guide: "{prefix}random-female"
  },

  onStart: async function({ event, threadsData, message, usersData }) {
    const uidI = event.senderID;
    const avatarUrl1 = await usersData.getAvatarUrl(uidI);
    const name1 = await usersData.getName(uidI);
    const threadData = await threadsData.get(event.threadID);
    const members = threadData.members.filter(member => member.inGroup);
    const senderGender = threadData.members.find(member => member.userID === uidI)?.gender;

    if (members.length === 0) return message.reply('There are no members in the group ☹💕😢');

    const eligibleMembers = members.filter(member => member.gender !== senderGender);
    if (eligibleMembers.length === 0) return message.reply('There are no male/female members in the group ☹💕😢');

    const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
    const randomMember = eligibleMembers[randomIndex];
    const name2 = await usersData.getName(`${randomMember.userID}`);
    const avatarUrl2 = await usersData.getAvatarUrl(`${randomMember.userID}`);
    const randomNumber1 = Math.floor(Math.random() * 36) + 65;
    const randomNumber2 = Math.floor(Math.random() * 36) + 65;

    message.reply({
      body: `𝗣𝗔𝗜𝗥 🌸     
━━━━━━━━━━━━━━━
• Everyone congratulates the new couple:
❤ ${name1} 💕 ${name2} ❤
Love percentage: "${randomNumber1} % 🤭"
Compatibility ratio: "${randomNumber2} % 💕"
        
        Congratulations 💝`,
      attachment: [
        await getStreamFromURL(`${avatarUrl1}`),
        await getStreamFromURL(`${avatarUrl2}`)
      ]
    });
  }
};
