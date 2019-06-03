module.exports = {
    name: "roles",
    description: "roles - Displays all the roles with their ID's",
    async exec(bot, m, args, db) {
        let msg = "";
        m.guild.roles.forEach(role => {
            msg += role.name + " - " + role.id.toString() + "\n";
        })
        m.channel.send(msg);
    }
}