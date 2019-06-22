const embedUtil = require("../utils/embed-util");
module.exports = {
    name: "queue",
    description: `queue <'channel' or 'role'> <channel name or role name> - Set the queue channel / role.`,
    async exec(bot, m, args, db) {
        if(args[0] && args[1]) {
            if(args[0] == "channel") {
                let channel = m.guild.channels.find(val => val.name === args[1]);
                if(channel) {
                    db.query(`UPDATE guilds SET queue = '${channel.id}' WHERE guild_id = '${m.guild.id}'`, (e) => {
                        if (e) throw e;
                        embedUtil.sendEmbed(m.channel, "green", "SUCCESS", "Your queue channel was set successfully.");
                    });
                } else embedUtil.sendEmbed(m.channel, "red", "ERROR", "I'm sorry! It seems like this channel does not exists.");
            } else if(args[0] == "role") {
                let role = m.guild.roles.find(val => val.name === args[1]);
                if(role) {
                    db.query(`UPDATE guilds SET queue_role = '${role.id}' WHERE guild_id = '${m.guild.id}'`, (e) => {
                        if (e) throw e;
                        embedUtil.sendEmbed(m.channel, "green", "SUCCESS", "Your queue role was set successfully.");    
                    });
                } else embedUtil.sendEmbed(m.channel, "red", "ERROR", "I'm sorry! It seems like this role does not exists.");
            } else embedUtil.sendEmbed(m.channel, "red", "USAGE", "queue <'channel' or 'role'> <channel id or role id>");
        } else embedUtil.sendEmbed(m.channel, "red", "USAGE", "queue <'channel' or 'role'> <channel id or role id>");
    }
}