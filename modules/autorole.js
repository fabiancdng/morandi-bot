const embedUtil = require("../utils/embed-util");
module.exports = {
    name: "autorole",
    description: "autorole <role name> - A role assigned to each new user.",
    exec(bot, m, args, db) {
        if(args[0]) {
            let role = m.guild.roles.find(val => val.name == args[0]);
            if(role) {
                db.query("UPDATE guilds SET autorole = '"+role.id+"' WHERE guild_id = '"+m.guild.id+"'", (e, r, f) => {
                    if(e) throw e;
                    embedUtil.sendEmbed(m.channel, "green", "SUCCESS", "The autorole was set successfully.");
                });
            } else if(args[0] == "off") {
                db.query("UPDATE guilds SET autorole = '' WHERE guild_id = '"+m.guild.id+"'", (e, r, f) => {
                    if(e) throw e;
                    embedUtil.sendEmbed(m.channel, "green", "SUCCESS", "The autorole is now turned off!");
                });
            } else embedUtil.sendEmbed(m.channel, "red", "ERROR", "I'm sorry. It seems like this role does not exists.");
        } else embedUtil.sendEmbed(m.channel, "red", "USAGE", "autorole <role name **or** 'off'>");
    }
}