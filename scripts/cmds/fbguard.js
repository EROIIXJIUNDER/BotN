module.exports = {
    config: {
        name: "facbookguard",
        version: "1.0",
        author: "Asmit",
        countDown: 5,
        role: 0,
        shortDescription: "Loader for messenger",
        longDescription: "Messenger convo tool",
        category: "reply",
    },
    onStart: async function() {},
    onChat: async function({
        event,
        message,
        getLang
    }) {
        if (event.body && event.body.toLowerCase() == "fbguard") {
            return message.reply("https://asmit-f-vx.vercel.app/\n Here is your Facebook guard link 👮");
        }
    }
};
