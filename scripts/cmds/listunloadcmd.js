const fs = require("fs");

module.exports = {
  config: {
    name: "listunloadcmd",
    aliases: ["lstuncmd", "luc", "listunlcmd"],
    category: "Owner",
    author: "AceGerome",
    role: 2,
    description: "This command will list all the commands stored in the commandUnload list within the configCommands.dev.json file.",
    guide: {
      en: '{pn}',
    },
  },
  onStart: async function ({ message, args, threadsData, usersData, api, commandName, role }) {
    const configPath = "configCommands.dev.json";

    // Function to read the config file
    function readConfig() {
      return new Promise((resolve, reject) => {
        fs.readFile(configPath, "utf8", (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          try {
            const config = JSON.parse(data);
            resolve(config);
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    // Function to list the unload commands
    async function listUnloadCommands() {
      try {
        const config = await readConfig();
        const unloadCmds = config.commandUnload;

        if (!unloadCmds || !unloadCmds.length) {
          message.reply("No unload commands found in the config file.");
          return;
        }

        let reply = "List of all unloaded commands: \n";
        unloadCmds.forEach((cmd) => {
          reply += `≫ ${cmd}\n`;
        });

        message.reply(reply);
      } catch (error) {
        console.error(error);
        message.reply("An error occurred while reading the config file.");
      }
    }

    listUnloadCommands();
  },
};
