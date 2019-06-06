const embedUtil = require("../utils/embed-util");
module.exports = {
    name: "clear",
    description: "clear <Number of Messages> - This command deletes messages in the chat.",
    async exec(bot, m, args, db) {
        if(args[0]) {
            if(args[0] >= 1 && args[0] <= 100) {
                let limit = Number(args[0])+2;
                m.channel.fetchMessages({ limit: limit })
                .then(messages => {
                    m.channel.bulkDelete(messages);
                    embedUtil.sendEmbed(m.channel, "blue", "", "Deleted "+args[0]+" message(s).");
                    }).catch(error => {embedUtil.sendEmbed(m.channel, "red", "ERROR", "The execution of the command failed:\n```"+error+"```");});
            } else {
                embedUtil.sendEmbed(m.channel, "red", "", "The number of messages to be deleted must be less than 100 and greater than 0.");
            }
        } else {
            m.channel.fetchMessages({ limit: 2 }).then(messages => {
                    m.channel.bulkDelete(messages);
                    embedUtil.sendEmbed(m.channel, "blue", "", "Deleted 1 message.");
            }).catch(error => {embedUtil.sendEmbed(m.channel, "red", "ERROR", "The execution of the command failed:\n```"+error+"```")});
        }
    }
};