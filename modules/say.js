const discord = require("discord.js");
const embedUtil = require("../utils/embed-util");
module.exports = {
    name: "say",
    description: "say <Message> - Send a simple embed with your message.",
    async exec(bot, m, args, db) {
        if(args[0]) {
            let embed = new discord.RichEmbed({
                title: "",
                color: 0xbd00ff,
                author: {
                    name: m.author.username,
                    icon_url: m.author.avatarURL
                },
                description: args.join(" ")
            });
            m.channel.send(embed);
        } else {
            embedUtil.sendEmbed(m, "red", "ERROR", "Syntax: say <Text to say>");
        }
    }
}