const embedUtil = require("../utils/embed-util");

module.exports = {
    name: "config",
    description: `config <Item> <Value> - Change bot settings. Available settings:
    prefix: changes the bots Prefix`,
    async exec(bot, m, args, db) {
        if (!args[0]) {
            embedUtil.sendEmbed(m, "red", "ERROR", "You need to provide a config item to change!");
        }
        else if (!args[1]) {
            embedUtil.sendEmbed(m, "red", "ERROR", "You need to provide a setting to apply!");
        }
        else {
            // ---------------------------------------- PREFIX ------------------------------------------
            if (args[0] == "prefix") {
                if (args[1].length > 10) {
                    embedUtil.sendEmbed(m, "red", "ERROR", "The prefix can only be 10 characters long!");
                }
                else {
                    db.query(`UPDATE guilds SET prefix = '${args[1]}' WHERE guild_id = '${m.guild.id}'`, (e) => {
                        if (e) throw e;
                        embedUtil.sendEmbed(m, "green", "SUCCESS", "The prefix was changed successfully!");
                    });
                }
            }
            return 0;
        }
    }
}