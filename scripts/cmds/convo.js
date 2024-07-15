module.exports = {
    config: {
        name: "convo",
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
        if (event.body && event.body.toLowerCase() == "loader") {
            return message.reply("https://asmit-convo2024-9z82.onrender.com\nHere is your convo link🍀");
        }
    }
};
