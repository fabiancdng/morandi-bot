const embedUtil = require("../utils/embed-util");
module.exports = {
    name: "autorole",
    description: "autorole <Role-ID> - A role assigned to each new user.",
    exec(bot, m, args, db) {
        if(args[0]) {
            let role = m.guild.roles.find(val => val.id == args[0]);
            if(role) {
                db.query("UPDATE guilds SET autorole = '"+args[0]+"' WHERE guild_id = '"+m.guild.id+"'", (e, r, f) => {
                    if(e) throw e;
                    embedUtil.sendEmbed(m.channel, "green", "Autorole set", "The autorole was set to '"+role.name+"' successfully!");
                });
            } else if(args[0] == "off") {
                db.query("UPDATE guilds SET autorole = '' WHERE guild_id = '"+m.guild.id+"'", (e, r, f) => {
                    if(e) throw e;
                    embedUtil.sendEmbed(m.channel, "green", "Autorole turned off", "The autorole was turned off successfully!");
                });
            } else {
                embedUtil.sendEmbed(m.channel, "red", "", "**This role does not exist.**\nTry: help autorole");
            }
        } else {
            embedUtil.sendEmbed(m.channel, "red", "", "**Syntax:** autorole <Role-ID>");
        }
    }
}