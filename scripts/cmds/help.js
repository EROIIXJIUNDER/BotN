const axios = require("axios");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "1.18",
    author: "Itz Aryan",
    countDown: 5,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{p}help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);

    const getFormattedText = async (text, fontType) => {
      try {
        const response = await axios.get('https://global-sprak.onrender.com/api/font', {
          params: {
            text,
            fontType
          }
        });
        return response.data.result;
      } catch (error) {
        console.error(`Error fetching ${fontType} text:`, error);
        return text;
      }
    };

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      for (const [name, value] of commands) {
        const category = value.config.category || "Uncategorized";
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(name);
      }

      const formattedCategoriesList = await Promise.all(
        Object.keys(categories).map(async (category) => {
          const boldCategory = await getFormattedText(category.toUpperCase(), 'bold');
          return { category, boldCategory };
        })
      );

      const formattedCommandsList = await Promise.all(
        Object.entries(categories).map(async ([category, commands]) => {
          const sansCommands = await Promise.all(
            commands.map((command) => getFormattedText(command, 'sans'))
          );
          return { category, sansCommands };
        })
      );

      for (const { category, boldCategory } of formattedCategoriesList) {
        if (category !== "info") {
          let section = `\n╭─⊙『  ${boldCategory}  』`;

          const commandsForCategory = formattedCommandsList.find(
            (cmd) => cmd.category === category
          ).sansCommands;
          for (let i = 0; i < commandsForCategory.length; i += 2) {
            const cmds = commandsForCategory.slice(i, i + 2).map((item) => `✧ ${item}`).join(" ");
            section += `\n│${cmds}`;
          }
          section += `\n╰────────────⊙`;

          msg += section;
        }
      }

      await message.reply({ body: msg });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription
          ? configCommand.longDescription[language] ||
            configCommand.longDescription.en ||
            "No description"
          : "No description";

        const guideBody = configCommand.guide?.[language] || configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const boldDescription = await getFormattedText(longDescription, 'sans');
        const boldUsage = await getFormattedText(usage, 'sans');
        const boldCommandName = await getFormattedText(configCommand.name, 'bold');

        const response = `
╭───⊙
  │ 🔶 ${boldCommandName}
  ├── INFO
  │ 📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${boldDescription}
  │ 👑 𝗔𝘂𝘁𝗵𝗼𝗿: ${author}
  │ ⚙️ 𝗚𝘂𝗶𝗱𝗲: ${boldUsage}
  ╰────────────⊙`;

        await message.reply(response);
      }
    }
  },
};
