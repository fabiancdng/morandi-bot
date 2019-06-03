module.exports.handle = async (bot, g, config, db) => {
    try {
        db.query("DELETE FROM guilds WHERE guild_id = '"+g.id+"'");
        console.log(`[BOT] >> '${g.name}' removed Morandi.`);
    } catch(error) {
        console.warn("[WARNING] >> Couldn't delete guild '"+g.id+"'");
    }
}