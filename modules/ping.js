const embedUtil = require("../utils/embed-util");
module.exports = {
    name: "ping",
    description: "ping - Check if the bot is reacting to you.",
    async exec(bot, m, args, db) {
        embedUtil.sendEmbed(m, "gold", "PONG!", "It seems like the bot is working correctly!");
    },
};