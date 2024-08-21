const axios = require('axios');
const fs = require('fs-extra');
const request = require('request');

module.exports = {
	config: {
		name: 'element',
		aliases: ['periodic'],
		version: '1.0',
		author: 'Samir x Void',
		countDown: 5,
		role: 0,
		description: {
			en: 'Get info of an element'
		},
		category: '𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡',
		guide: {
			en: '{pn} <element>'
		}
	},
	onStart: async function ({ api, event, args }) {
		try {
			const { threadID, messageID } = event;
			const element = args.join(' ');
			const response = await axios.get(`https://api.popcat.xyz/periodic-table?element=${element}`);
			const data = response.data;
			console.log(data);

			const callback = function() {
				return api.sendMessage({
					body: `🧪 𝗘𝗹𝗲𝗺𝗲𝗻𝘁 » ${data.name}\n✳️ 𝗦𝘆𝗺𝗯𝗼𝗹 » ${data.symbol}\n🧮 𝗔𝘁𝗼𝗺𝗶𝗰 𝗡𝘂𝗺𝗯𝗲r » ${data.atomic_number}\n⚛️  𝗔𝘁𝗼𝗺𝗶𝗰 𝗠𝗮𝘀𝘀 » ${data.atomic_mass}\n✧⋄⋆⋅⋆✧⋆⋅⋆⋄✧⋄⋆⋅⋆✧⋆⋅⋆⋄✧\n📜 𝗦𝘂𝗺𝗺𝗮𝗿𝘆 »  ${data.summary}`,
					attachment: fs.createReadStream(__dirname + `/tmp/image.png`)
				}, threadID, () => fs.unlinkSync(__dirname + `/tmp/image.png`), messageID);
			};
			return request(encodeURI(data.image)).pipe(fs.createWriteStream(__dirname + `/tmp/image.png`)).on('close', callback);
		} catch (err) {
			console.error(err);
			return api.sendMessage('Please provide an element name.', event.threadID);
		}
	}
};
