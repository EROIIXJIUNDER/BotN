const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "ssweb",
    //aliases: [""], 
    version: "1.0.0",
    author: "James | API by Ace",
    countDown: 5,
    role: 2,
    description: {
        en: "Screenshot the inside of Web-Provided."
    }, 
    category: "owner", 
    guide: {
      en: "To use this command, type {pn} <url> - To Screenshot Inside."
    } 
  },
  
  onStart: async function({ api, event, args }) {
  const { threadID, messageID } = event;
  const { getPrefix } = global.utils;
  const p = getPrefix(threadID);
  let url = args[1];
  if(!args[0] || !args[1]) {
   api.sendMessage(`❌ | Wrong format! \n\nExample: ${p}ssweb <video or image> <url>\n${p}ssweb vid github.com`, threadID, messageID);
  }
  else if(args[0] == 'video' || args[0] == '-v') {
    const g1 = await axios.get(`https://shot.screenshotapi.net/screenshot?token=CHGVS1S-DBE4KBJ-MJYVBZM-8BPSJDE&url=${url}&output=json&file_type=gif&wait_for_event=load&scrolling_screenshot=true`);
    let path = __dirname + `/tmp/web.mp4`;
    const giff = (await axios.get(g1.data.screenshot, { responseType: "arraybuffer", })).data;
    
    fs.writeFileSync(path, Buffer.from(giff, 'utf-8'));
    
    return api.sendMessage({
      body: "Success!!",
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path), messageID);
    
  }
  else if(args[0] == "image" || args[0] == "-i") {
    const g2 = await axios.get(`https://shot.screenshotapi.net/screenshot?token=CHGVS1S-DBE4KBJ-MJYVBZM-8BPSJDE&url=${url}`);
    let path2 = __dirname + `/tmp/web.png`;
    const img = (await axios.get(g2.data.screenshot, { responseType: "arraybuffer", })).data;
    
    fs.writeFileSync(path2, Buffer.from(img, 'utf-8'));
    
    return api.sendMessage({
      body: "Success!!",
      attachment: fs.createReadStream(path2)
    }, threadID, () => fs.unlinkSync(path2), messageID);
  }
 }
};
