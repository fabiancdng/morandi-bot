module.exports.check = async (db) => {
    db.query("CREATE DATABASE IF NOT EXISTS morandi", (e) => {
        if(e) throw e;
        db.changeUser({database : "morandi"}, (e) => {
            if (e) throw e;
            console.log("[MYSQL] >> Database checked!");
        });
        db.query(`CREATE TABLE IF NOT EXISTS guilds (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            guild_id VARCHAR(50),
            prefix VARCHAR(10),
            queue VARCHAR(50),
            queue_role VARCHAR(50),
            autorole VARCHAR(50)
            )`, (e) =>  {
                if(e) throw e;
                console.log("[MYSQL] >> Tables checked!");
            });
    });
}