const accounts = [];

function generateAccount(email, password) {
  return `[Generate Successfully]\n\n` +
         `Email: ${email}\n` + 
         `Password: ${password}`;
}

module.exports = {
  config: {
    name: "fbaccount",
    aliases: ['fbacc'],
    version: "69",
    author: "?/zed | Ace",
    countDown: 5,
    role: 2,
    description: {
      en: "Stock the Account in Facebook."
    },
    category: "owner",
    guide: {
      en: "   {pn} add <email> <password>"
        + "\n{pn} get - get the account"
        + "\n{pn} list - To view account list"
    }
  }, 
  
  onStart: async function ({ api, event, args }) {
  const [action] = args;
  const { getPrefix } = global.utils;
  const p = getPrefix(event.threadID); 

  if (action === "get") {
    if (accounts.length > 0) {
      const { email, password } = accounts.shift();
      api.sendMessage(generateAccount(email, password), event.threadID);
    } else {
      api.sendMessage("No accounts available.", event.threadID);
    }
  } else if (action === "add") {
    const [, email, password] = args;
    if (email && password) {
      accounts.push({ email, password });
      api.sendMessage("Account added to stock.", event.threadID);
    } else {
      api.sendMessage("Invalid format. Please provide valid email and password to add to the stock.", event.threadID);
    }
  } else if (action === "list") {
    api.sendMessage(`Number of stocked accounts: ${accounts.length}`, event.threadID);
  } else {
    api.sendMessage("Invalid format. Usage: ${p}fbacc get or ${p}fbacc add <email> <password> or ${p}fbacc list", event.threadID);
    }
  },
};
