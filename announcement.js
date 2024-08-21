const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const https = require('https');

const botAdmins = global.GoatBot.config.adminBot;

module.exports = {
  config: {
    name: 'announcement',
    aliases: ["announce", "news"],
    version: 1.2,
    author: 'JV Barcenas',
    countDown: 5,
    role: 0,
    description: {
      en: 'Create or display server announcements'
    },
    category: 'admin',
    guide: {
      en: '   {pn} [post|create]: To create a new announcement\n   {pn}: To display the current announcement'
    },
  },

  langs: {
    en: {
      announcementSet: 'Your announcement has been set.',
      noAnnouncement: 'There is no current announcement.',
      currentAnnouncement: '▽ Current announcement ▽:\n───────────────────\n%1\n───────────────────\n',
      fetchError: 'An error occurred while fetching the latest bot code.'
    }
  },

  onStart: async function ({ args, message, api, event }) {
    const { senderID } = event;
    const announcementFilePath = path.join(__dirname, '/JSON/announcement.txt');

    
    if (args[0] === 'post' || args[0] === 'create') {
      const announcementText = args.slice(1).join(' ');

      if (!announcementText) {
        message.reply('Please provide the announcement text. Usage: /announcement create [text]');
        return;
      }

      // Check if the sender is a bot admin
      if (!botAdmins.includes(senderID)) {
        message.reply('You do not have permission to use this command.');
        return;
      }

      try {
        fs.writeFileSync(announcementFilePath, announcementText);
        message.reply(this.langs.en.announcementSet);
      } catch (err) {
        console.error('Error writing to announcement file:', err);
        message.reply('An error occurred while setting the announcement.');
      }

      return;
    }

    // If no arguments, display the current announcement.
    if (!args[0]) {
      try {
        const currentAnnouncement = fs.readFileSync(announcementFilePath, 'utf8');
        if (currentAnnouncement.trim() !== '') {
          message.reply(this.langs.en.currentAnnouncement.replace('%1', currentAnnouncement));
        } else {
          message.reply(this.langs.en.noAnnouncement);
        }
      } catch (err) {
        console.error('Error reading announcement file:', err);
        message.reply('An error occurred while fetching the announcement.');
      }

      return;
    }

    message.reply('Unknown command. Usage: /announcement [post|create] [text]');
  }
};
