module.exports.handle = async (mem, db) => {
    db.query("SELECT autorole FROM guilds WHERE guild_id = '"+mem.guild.id+"'", (e, r, f) => {
        if(!r[0]) return;
        else if(r[0].autorole == "") return;
        else {
            try{
            
                let role = mem.guild.roles.find(val => val.id == r[0].autorole);
                if(role) {
                    mem.addRole(role);
                } else return;
            
            } catch(error) {
                return;
            }
        }
    });
}