const embedUtil = require("../utils/embed-util");

module.exports.handle = async (bot, m, config, db) => {
    if(m.author.bot) return;
    if(m.channel.type == "dm") return;
    db.query(`SELECT prefix FROM guilds WHERE guild_id = '${m.guild.id}'`, (e, r) => {
        if (e) throw e;
        let mArray;
        let prefix = r[0].prefix;

        if(m.content.startsWith(prefix)) {
            mArray = m.content.slice(prefix.length).split(" ");
        } else if(m.content.startsWith("mr:")) {
            mArray = m.content.slice(3).split(" ");
        } else return;

        if(m.content.startsWith("mr:")) { prefix = "mr:"; }

        let command = mArray[0];
        let args = mArray.slice(1);

        
        if(!bot.modules.has(command)) {
            embedUtil.sendEmbed(m.channel, "red", "ERROR", "This command is not registered! Is there a typo?");
            return;
        };
        
        try {
            bot.modules.get(command).exec(bot, m, args, db);
        } catch(error) {
            embedUtil.sendEmbed(m.channel, "red", "ERROR", "The Execution of the command failed:\n```"+error+"```");
        }
    });
}