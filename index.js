/*
    MorandiBot v.1.0.0
    Developed by Fabian R. (fabiancdng).
    
    Original-Repository: https://github.com/fabiancdng/morandi-bot
    Please take a look at the README and LICENSE file.

    This bot is modular.
    Some modules have been developed in collaboration with others.
    See the repository.

    (c) 2019 Fabian R. (fabiancdng)
*/
const discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");
// Internal imports
const config = require("./config");
const embedUtil = require("./utils/embed-util");
const dbUtil = require("./utils/db-util");
const message_event = require("./events/message_event");
const guildCreate_event = require("./events/guildCreate_event");
const guildDelete_event = require("./events/guildDelete_event");
const voiceStateUpdate_event = require("./events/voiceStateUpdate_event");
const guildMemberAdd_event = require("./events/guildMemberAdd_event");

var db = mysql.createConnection({
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.pass,
    charset: "utf8mb4"
});

db.connect((e) => {
    if(e) throw e;
    console.log("[MYSQL] Connected to MySQL!");
});

//Create / repair database and tables
dbUtil.check(db);

const bot = new discord.Client();

bot.modules = new discord.Collection();

const moduleFiles = fs.readdirSync("./modules").filter(f => f.endsWith(".js"));

moduleFiles.forEach(f => {
    const module = require(`./modules/${f}`);
    bot.modules.set(module.name, module, module.description);
    console.log(`[MODULE] >> '${module.name}' loaded!`);
});

bot.on("ready", async () => {
    console.log("[BOT] >> Bot is running!");
    bot.generateInvite(["ADMINISTRATOR"]).then(link => console.log("[BOT] >> Invite: "+link));
    bot.user.setActivity("mr:help", {type: "LISTENING"});
});

bot.on("message", async (m) => message_event.handle(bot, m, config, db));
bot.on("guildCreate", async (g) => guildCreate_event.handle(bot, g, config, db));
bot.on("guildDelete", async(g) => guildDelete_event.handle(bot, g, config, db));
bot.on("voiceStateUpdate", async (oldMember, newMember) => voiceStateUpdate_event.handle(bot, oldMember, newMember, db));
bot.on("guildMemberAdd", async (mem) => guildMemberAdd_event.handle(mem, db));

bot.login(config.token);