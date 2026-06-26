const axios = require("axios");
const { cmd } = require("../DianaTech");

cmd({
  pattern: "facebook",
  alias: ["fb", "fbdl"],
  react: "📥",
  desc: "Facebook Video Downloader",
  category: "download",
  use: ".fb <facebook url>",
  filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply, args }) => {

  try {

    const fbUrl = args[0];

    // ✅ FAKE VERIFIED MESSAGE
    const fakeVerified = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "🔵 DIANA TECH 🤫",
          vcard: `BEGIN:VCARD
VERSION:3.0
FN:𝐃𝐈𝐀𝐍𝐀 𝐗𝐌𝐃 𝐁𝐎𝐓
ORG:𝐃𝐈𝐀𝐍𝐀-𝐗𝐌𝐃 VERIFIED;
TITLE:Official WhatsApp Bot
TEL;type=CELL;type=VOICE;waid=18492823944:+18492823944
END:VCARD`
        }
      }
    };

    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply(`
╭━━━━━━━━━━━━━━━━━━⬣
┃ ❌ INVALID FACEBOOK URL
┣━━━━━━━━━━━━━━━━━━⬣
┃ 📌 Send a valid FB link
┃
┃ Example:
┃ .fb https://facebook.com/...
╰━━━━━━━━━━━━━━━━━━⬣`);
    }

    // ⏳ REACTION
    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    // 🔥 LOADING MESSAGE
    await conn.sendMessage(from, {
      text: `
╭━━━━━━━━━━━━━━━━━━⬣
┃ 📥 FACEBOOK DOWNLOADER
┣━━━━━━━━━━━━━━━━━━⬣
┃ ⏳ Downloading Video...
┃ ⚡ Please Wait
┃ 🚀 Powered By Diana Tech
╰━━━━━━━━━━━━━━━━━━⬣
`
    }, { quoted: fakeVerified });

    // API REQUEST
    const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(fbUrl)}`;

    const response = await axios.get(apiUrl);

    const data = response.data;

    if (!data.status || !data.result || !Array.isArray(data.result)) {
      return reply(`
╭━━━━━━━━━━━━━━━━━━⬣
┃ ❌ DOWNLOAD FAILED
┣━━━━━━━━━━━━━━━━━━⬣
┃ Unable to fetch video
┃ Try another Facebook link
╰━━━━━━━━━━━━━━━━━━⬣`);
    }

    // HD FIRST
    const hd = data.result.find(v => v.quality === "HD");
    const sd = data.result.find(v => v.quality === "SD");

    const video = hd || sd;

    if (!video) {
      return reply("❌ Video not found.");
    }

    // 🎥 SEND VIDEO
    await conn.sendMessage(from, {
      video: { url: video.url },
      mimetype: "video/mp4",
      caption: `
╭━━━━━━━━━━━━━━━━━━⬣
┃ ✅ VIDEO DOWNLOADED
┣━━━━━━━━━━━━━━━━━━⬣
┃ 🎬 Quality : ${video.quality}
┃ ⚡ Status : Success
┃ 🚀 Speed : Fast
╰━━━━━━━━━━━━━━━━━━⬣

> 👑 Powered By Diana Tech 💜
`
    }, { quoted: fakeVerified });

    // ✅ SUCCESS REACTION
    await conn.sendMessage(from, {
      react: { text: "✅", key: m.key }
    });

  } catch (error) {

    console.log(error);

    await conn.sendMessage(from, {
      react: { text: "❌", key: m.key }
    });

    reply(`
╭━━━━━━━━━━━━━━━━━━⬣
┃ ❌ SYSTEM ERROR
┣━━━━━━━━━━━━━━━━━━⬣
┃ Failed To Download Video
┃ Try Again Later
╰━━━━━━━━━━━━━━━━━━⬣`);
  }
});