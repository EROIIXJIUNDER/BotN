module.exports = {
  config: {
    name: "confess",
    //aliases: ['confess'],
    version: "1.0.0",
    author: "AceGerome",
    countDown: 5,
    role: 0,
    description: {
      en: "Confess your feeling to someone!"
    },
    category: "fun",
    guide: {
      en: "   {pn} <Fb url or UserID> | <message> | <from>"
    }
  },
 
 onStart: async function ({ api, args, event, message }) {
     
     const y = args.join(" ").split("|").map(item => item = item.trim());
     
     var id = y[0]
     var msg = y[1]
     var author = y[2]
     
     if(!args[0] || !id) return message.reply("Missing Facebook URL or UID.");
     if(!msg) return message.reply("Missing message.");
     if(!author) return message.reply("Missing Author");
     
     try {
         if(id.startsWith("https://facebook.com")) {
             const UID = await api.getUID(id)
             var k = UID
         } else {
             var k = id
         }
         api.sendMessage(`🛂 | 𝗬𝗼𝘂\'𝘃𝗲 𝗴𝗼𝘁 𝗮 𝗖𝗼𝗻𝗳𝗲𝘀𝘀 𝗠𝗲𝘀𝘀𝗮𝗴𝗲\n━━━━━━━━━━━━━━━━━━━━━━━━━\n📝: ${msg}\n━━━━━━━━━━━━━━━━━━━━━━━━━\nFrom: ${author}\n━━━━━━━━━━━━━━━━━━━━━━━━━\n•⁠| Don\'t bother me by asking who\'s the sender, you\'re just wasting your time!`, k, () => message.reply("Confession has been sent successfully"))
     } catch (err) {
         message.reply("I'm sorry, but your confession has failed to send. I think it's time to chat with that person and confess your feelings. (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)")
     };
   }
};
