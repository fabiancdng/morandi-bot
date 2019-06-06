const discord = require("discord.js");
const embedUtil = require("../utils/embed-util");
const index = require("../index");
module.exports = {
    name: "help",
    async exec(bot, m, args, db) {
        let msg; //variable needed for while loop
        let embed;
        if(!args[0]) { //variable needed for while loop
            let modules = "";
            bot.modules.forEach(element => {
                modules += element.name + "\n"
            });
            embed = new discord.RichEmbed({
                title: "Morandi -- Help",
                description: "This is the help embed of Morandi. All commands are listed here!",
                color: 0x438900,
                fields: [
                    {
                        name: `**Disclaimer**`,
                        value: `The listed commands don't include the Prefix.
                        For the Bot to respond, you need to put the Prefix in front of the command.
                        The overall Syntax is: _<prefix><command> <Arguments>_
                        For example: _mr:say This is a test!_`,
                    },
                    {
                        name: "**How to get specific help**",
                        value: `If you want help for a specific module, just type: help <name of module>`,
                    },
                    {
                        name: "**What modules there are**",
                        value: modules
                    }
                ]
            });
        } else if (args[0]) {
            let des = bot.modules.get(args[0]).description;
            embedUtil.sendEmbed(m.channel, "blue", "HELP", des);
            return;
        }
        while (!msg) { if (embed) { msg = m.channel.send(embed); }} //sending message if embed is there
    }
}