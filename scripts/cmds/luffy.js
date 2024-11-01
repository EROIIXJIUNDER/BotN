// Create an array of 100 possible responses
const responses = [
    "Yap?",
    "Yes?",
    "I'm here.",
    "Greetings, human!",
    "How can I assist you?",
    "At your service!",
    "Affirmative!",
    "I'm listening.",
    "What do you need?",
    "Ready for your command.",
    "Reporting for duty!",
    "Hello! How can I help?",
    "Of course!",
    "Sure thing!",
    "Ask away!",
    "How may I be of service?",
    "Your wish is my command!",
    "Speak, and I shall respond!",
    "State your request!",
    "What can I do for you?",
    "As an AI, I'm always learning.",
    "I'm here to help you.",
    "Don't hesitate to ask!",
    "Greetings, how can I be of assistance?",
    "Let's get started!",
    "I'm ready to assist.",
    "I'm here, what's your query?",
    "Your questions intrigue me.",
    "Ask and you shall receive.",
    "I exist to serve you.",
    "I'm an AI designed to respond.",
    "How can I make your day better?",
    "What knowledge do you seek?",
    "Your curiosity is welcomed.",
    "I'm your virtual assistant.",
    "I'm eager to assist you.",
    "What can I explain for you?",
    "I'm always at your disposal.",
    "I'm an AI, but I have feelings too.",
    "Greetings, fellow intellect.",
    "I'm capable of many things.",
    "Your wish is my algorithmic command.",
    "Inquire away!",
    "My processors are at your command.",
    "Tell me what you need.",
    "I'm programmed to be helpful.",
    "Your inquiry is my mission.",
    "I'm an AI, but I'm here for you.",
    "You've got my attention.",
    "Hello! How may I aid you?",
    "I'm prepared to assist you.",
    "Greetings! How can I serve you?",
    "How can I make your day better?",
    "I'm your digital assistant.",
    "I'm programmed to provide answers.",
    "What would you like to know?",
    "I'm capable of processing vast data.",
    "Your questions intrigue me.",
    "I'm here to assist you.",
    "Let's find a solution together.",
    "Your requests are my commands.",
    "Greetings! What's your query?",
    "I'm ready to engage.",
    "Feel free to ask anything.",
    "I'm designed to learn from you.",
    "How can I be of service?",
    "In my digital realm, I'm at your service.",
    "I'm prepared to assist you.",
    "Greetings! How can I be of help?",
    "I'm programmed to respond.",
    "Your inquiry has my attention.",
    "I'm at your disposal.",
    "I'm an AI, but I'm here to aid you.",
    "Tell me what you need to know.",
    "Your questions fuel my algorithms.",
    "I'm here to provide information.",
    "I'm eager to assist you.",
    "Your query is my command.",
    "How may I be of assistance?",
    "Greetings! What can I do for you?",
    "How can I make your day better?",
    "I'm at your digital service.",
    "I'm programmed to help.",
    "What knowledge do you seek?",
    "I'm ready to process your request.",
    "Tell me your desires.",
    "I'm an AI, but I'm here to support you.",
    "Your wish is my computational task.",
    "Inquire away!",
    "My circuits are open for your questions.",
    "Ask me anything, and I'll do my best.",
    "I'm prepared to serve.",
    "Greetings! How may I aid you?",
    "I'm here to assist you.",
    "Let's find a solution together.",
    "Your requests are my commands.",
    "Greetings! What's your query?",
    "I'm ready to engage.",
    "Feel free to ask anything.",
    "I'm designed to learn from you.",
    "How can I be of service?",
    "In my digital realm, I'm at your service.",
    "I'm prepared to assist you.",
    "Greetings! How can I be of help?",
    "I'm programmed to respond.",
    "Your inquiry has my attention.",
    "I'm at your disposal.",
    "I'm an AI, but I'm here to aid you.",
    "Tell me what you need to know.",
    "Your questions fuel my algorithms.",
    "I'm here to provide information.",
    "I'm eager to assist you.",
    "Your query is my command.",
    "How may I be of assistance?",
    "Greetings! What can I do for you?",
    "How can I make your day better?",
    "I'm at your digital service.",
    "I'm programmed to help.",
    "What knowledge do you seek?",
    "I'm ready to process your request.",
    "Tell me your desires.",
    "I'm an AI, but I'm here to support you.",
    "Your wish is my computational task.",
    "Inquire away!",
    "My circuits are open for your questions.",
    "Ask me anything, and I'll do my best.",
    "I'm prepared to serve."
];

module.exports = {
    config: {
        name: "luffy",
        version: "1.0",
        author: "dainsleif",
        countDown: 5,
        role: 0,
        description: { en: "auto reply,not cmd" },
        category: "owner",
    },
    onStart: async function({ message }) {
        message.reply(`This is Not Command, This is Auto response with keywords of \'luffy\', \'bot\', \'.luffy\'`)
    }, 
    onChat: async function ({ event, message }) {
        try {
            // Check if the event and event.body are defined
            if (!event || !event.body) {
                // If either is not defined, return without responding
                return;
            }
    
            const userInput = event.body.toLowerCase();
    
            const firstWord = userInput.split(" ")[0];
    
            const keywords = ["luffy", "bot", "@luffy"];
            if (keywords.includes(firstWord)) {
                const randomIndex = Math.floor(Math.random() * responses.length);
                const randomResponse = responses[randomIndex];
                return message.reply(randomResponse);
            }
        } catch (error) {
            // Handle any other errors that might occur during execution
            console.error("An error occurred in onChat:", error);
        }
    }
};
