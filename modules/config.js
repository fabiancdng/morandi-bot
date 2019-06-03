const embedUtil = require("../utils/embed-util");

module.exports = {
    name: "config",
    description: `config <Item> <Value> - Change bot settings. Available settings:
    prefix: changes the bots Prefix
    queuerole`,
    async exec(bot, m, args, db) {
        if (!args[0]) {
            embedUtil.sendEmbed(m, "red", "ERROR", "You need to provide a config item to change!");
        }
        else if (!args[1]) {
            embedUtil.sendEmbed(m, "red", "ERROR", "You need to provide a setting to apply!");
        }
        else {
            // ---------------------------------------- PRFIX ------------------------------------------
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
            // ------------------------------------- QUEUE ROLE ------------------------------------------
            if (args[0] == "queuerole") {
                if (!args[1]) {
                    embedUtil.sendEmbed(m, "red", "ERROR", "You need to specify a **queue role id**");
                } else {
                    db.query(`UPDATE guilds SET queue_role = '${args[1]}' WHERE guild_id = '${m.guild.id}'`, (e) => {
                        if (e) throw e;
                        embedUtil.sendEmbed(m, "green", "SUCCESS", "The queue role was changed successfully!");
                    });
                }
            }
            // ------------------------------------- QUEUE ROLE ------------------------------------------
            if (args[0] == "queue") {
                if (!args[1]) {
                    embedUtil.sendEmbed(m, "red", "ERROR", "You need to specify a **queue channel id**");
                } else {
                    db.query(`UPDATE guilds SET queue = '${args[1]}' WHERE guild_id = '${m.guild.id}'`, (e) => {
                        if (e) throw e;
                        embedUtil.sendEmbed(m, "green", "SUCCESS", "The queue channel was changed successfully!");
                    });
                }
            }
        }
        m.delete();
        return 0;
    }
}