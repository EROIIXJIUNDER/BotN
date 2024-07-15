const axios = require("axios");
const APIKEY = "x-store-evfeh65-u6tgv-vttu-x"; //Add here goatmart apikey if you don't have then ask to Aryan for apikey

module.exports = {
  config: {
    name: "store",
    role: 2,
    shortDescription: {
      en: "View items available in the Store"
    },
    author: "ArYAN",
  },
  onStart: async ({ api, event, args, message }) => {
    const serverURL = "https://betastore.onrender.com";

    try {
      if (!args[0]) {
        api.sendMessage(`📚 𝗦𝘁𝗼𝗿𝗲 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━━━\n\n➜ ${event.body} page < 𝗽𝗮𝗴𝗲 𝗻𝘂𝗺𝗯𝗲𝗿 >\n➜ ${event.body} show < 𝗜𝘁𝗲𝗺 𝗜𝗗 >\n➜ ${event.body} search < 𝗜𝘁𝗲𝗺 𝗡𝗮𝗺𝗲 >`, event.threadID, event.messageID);
      } else if (args[0] === "page") {
        const pageNumber = parseInt(args[1]);
        const response = await axios.get(`${serverURL}/api/items`, {
          headers: { 'x-api-key': APIKEY }
        });
        const items = response.data;
        const totalPages = Math.ceil(items.length / 10);
        const offset = (pageNumber - 1) * 10;

        if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
          api.sendMessage("📚 𝗦𝘁𝗼𝗿𝗲 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━━━\n\nInvalid page number, you are trying to access an unknown page. Please provide valid page numbers.", event.threadID, event.messageID);
        } else {
          const pageItems = items.slice(offset, offset + 10);

          const itemDescriptions = pageItems.map(
            (item) =>
              `👑 𝗜𝘁𝗲𝗺 𝗡𝗮𝗺𝗲: ${item.itemName}\n🆔 𝗜𝘁𝗲𝗺 𝗜𝗗: ${item.itemID}\n⚙ 𝗜𝘁𝗲𝗺 𝗧𝘆𝗽𝗲: ${item.type || "Unknown"}\n📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${item.description}\n💻 𝗔𝘂𝘁𝗵𝗼𝗿: ${item.authorName}\n📅 𝗧𝗶𝗺𝗲: ${new Date(item.timestamp).toLocaleString()}\n\n━━━━━━━━━━━━━━━\n`
          );

          const itemInfo = itemDescriptions.join("\n");

          message.reply(`📚 𝗦𝘁𝗼𝗿𝗲 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━━━\n\nItems available in the 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁\n\n${itemInfo}📝 𝗨𝘀𝗮𝗴𝗲𝘀:\n ${event.body.split(" ")[0]} [ show ] <item id> to view commmad data.\n\n👑 Pages: [ ${pageNumber} / ${totalPages} ]`);
        }
      } else if (args[0] === "show") {
        const itemID = isNaN(args[1]) ? args[1] : parseInt(args[1]);
        const response = await axios.get(`${serverURL}/api/items/${itemID}`, {
          headers: { 'x-api-key': APIKEY }
        });
        const item = response.data;

        if (item && itemID) {
          message.reply(`📚 𝗦𝘁𝗼𝗿𝗲 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━━━\n\n👑 𝗜𝘁𝗲𝗺 𝗡𝗮𝗺𝗲: ${item.itemName}\n🆔 𝗜𝘁𝗲𝗺 𝗜𝗗: ${item.itemID}\n📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${item.description}\n📁 𝗜𝘁𝗲𝗺 𝗟𝗶𝗻𝗸: ${item.pastebinLink}`);
        } else {
          api.sendMessage("📚 𝗦𝘁𝗼𝗿𝗲 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━━━\n\nItem not available in 𝗚𝗼𝗮𝘁𝗠𝗮𝗿𝘁. Please check your input or try again.", event.threadID, event.messageID);
        }
      } else if (args[0] === "search") {
        const searchTerm = args.slice(1).join(" ").toLowerCase();
        const response = await axios.get(`${serverURL}/api/items`, {
          headers: { 'x-api-key': APIKEY }
        });
        const items = response.data;
        const matchingItems = items.filter(item => item.itemName.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm));

        if (matchingItems.length > 0) {
          const itemDescriptions = matchingItems.map(item => `\n👑 𝗜𝘁𝗲𝗺 𝗡𝗮𝗺𝗲: ${item.itemName}\n🆔 𝗜𝘁𝗲𝗺 𝗜𝗗: ${item.itemID}\n⚙ 𝗜𝘁𝗲𝗺 𝗧𝘆𝗽𝗲: ${item.type || "Unknown"}\n📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${item.description}\n💻 𝗔𝘂𝘁𝗵𝗼𝗿: ${item.authorName}\n📅 𝗧𝗶𝗺𝗲: ${new Date(item.timestamp).toLocaleString()}\n━━━━━━━━━━━━━━━\n`);
          const itemInfo = itemDescriptions.join("\n");

          message.reply(`📚 𝗦𝘁𝗼𝗿𝗲 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━━━\n\n✅ Search Results for ${searchTerm}\n\n${itemInfo}`);
        } else {
          api.sendMessage("📚 𝗦𝘁𝗼𝗿𝗲 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━━━\n\nNo matching items found in GoatMart.", event.threadID, event.messageID);
        }
      } else if (args[0] === "upload") {
        const itemDetails = JSON.parse(args.slice(1).join(" "));
        const response = await axios.post(`${serverURL}/api/items`, itemDetails, {
          headers: { 'x-api-key': APIKEY }
        });
        message.reply(`📚 𝗦𝘁𝗼𝗿𝗲 ( 𝖻𝖾𝗍𝖺 )\n━━━━━━━━━━━━━━━\n\n✅ Item uploaded successfully\n👑 𝗜𝘁𝗲𝗺 𝗡𝗮𝗺𝗲: ${response.data.itemName}\n🆔 𝗜𝘁𝗲𝗺 𝗜𝗗: ${response.data.itemID}\n⚙ 𝗜𝘁𝗲𝗺 𝗧𝘆𝗽𝗲: ${response.data.type || "Unknown"}`);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      api.sendMessage(`Request failed with status code: ${error.response.status} \n\n You are not authorized to access this command. Error 403: Access denied.`, event.threadID, event.messageID);
    }
  },
};
