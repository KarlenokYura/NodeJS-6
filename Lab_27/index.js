const TeleBot = require('node-telegram-bot-api');
const Token = '1171165815:AAEUU44nT8r0-zH80u-zfSoWL1gBK-lRFPI';

const bot = new TeleBot(Token, {
    polling: true
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    bot.sendMessage(chatId, `echo: ${msg.text}`);
});
