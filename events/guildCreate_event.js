module.exports.handle = async (bot, g, config, db) => {
    db.query("SELECT * FROM guilds WHERE guild_id = '"+g.id+"'", (e, r, f) => {
        if(e) throw e;
        if(r[0]) {
            console.log(`[BOT] >> '${g.name}' added Morandi.`);
        } else {
            let sql = "INSERT INTO guilds (id, guild_id, prefix, queue, queue_role, autorole) VALUES ('', '"+g.id+"', 'mr:', '', '', '')";
            db.query(sql, (e) => {if(e) throw e;});
            console.log(`[BOT] >> '${g.name}' added Morandi.`);
        }
    });
}