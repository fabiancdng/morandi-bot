module.exports.handle = (callback) => {
    const fs = require("fs");
    const rl = require("readline-sync");
    var good = true;
    const conf_file = "./config.json";

    const config_template = {
        "mysql": {
            "host": "",
            "port": "",
            "user": "",
            "pass": ""
        },
        "token": ""
    }

    function ask_data() {
        config_template.mysql.host = rl.question("MySQL server adress: ");
        config_template.mysql.port = rl.question("MySQL port (default: 3306): ");
        config_template.mysql.user = rl.question("MySQL username: ");
        config_template.mysql.pass = rl.question("MySQL password: ");
        config_template.token = rl.question("Discord bot token: ");
    }

    fs.exists(conf_file, (exists) => {
        console.log("[CONFIG] >> Loaded config!");
        if(exists == true) {
            let conf = require("." + conf_file);
            callback(conf);
        } else {
            console.log("It seems like you did not create a config file!\nPlease enter the parameters:\n");
            ask_data();
            fs.createWriteStream(conf_file).end();
            fs.writeFile(conf_file, JSON.stringify(config_template), (e) => { 
                if(e) throw e;
                console.log("Config created!");
                callback(require("." + conf_file));
            });
        }
        console.log("Config exported!")
    });

}