module.exports = {
    config: {
        name: "rule",
        version: "1.0",
        author: "Asmit",
        countDown: 5,
        role: 0,
        shortDescription: "Provides group rules",
        longDescription: "Fetches and displays group rules",
        category: "reply",
    },
    onStart: async function() {},
    onChat: async function({
        event,
        message,
        getLang
    }) {
        const rules = [
            "No Sexual words or content. Be careful, Admin will kick you without warning. ⚠",
            "Don't spam messages in GC or you will be kicked from GC. ⚠",
            "Don't talk forcefully to someone in GC. Approach friendly. If the person doesn't want to talk to you, just ignore and talk to someone else.",
            "No fighting in chat. Be respectful with everyone. If you have any problem, tag an Admin.",
            "Don't abuse or insult anyone in the chat. If you have a personal issue with someone, solve your matter in inbox.",
            "ALL RULES MUST BE FOLLOWED OR YOU WILL BE KICKED OUT WITHOUT WARNING. ⚠",
            "Don't kick the bot without botAdmin permission.",
            "Don't use AI for any 18+ commands in this group. (1 warning)"
        ];

        if (event.body && event.body.toLowerCase().startsWith("rules")) {
            const request = event.body.toLowerCase().split(" ");
            if (request.length > 1) {
                if (request[1] === "all") {
                    return message.reply(rules.map((rule, index) => `${index + 1}. ${rule}`).join("\n"));
                } else {
                    const requestedRules = request[1].split(",").map(Number).filter(n => !isNaN(n) && n >= 1 && n <= rules.length);
                    if (requestedRules.length > 0) {
                        const reply = requestedRules.map(n => `${n}. ${rules[n - 1]}`).join("\n");
                        return message.reply(reply);
                    }
                }
            } else {
                return message.reply(rules.map((rule, index) => `${index + 1}. ${rule}`).join("\n"));
            }
        }
    }
};
