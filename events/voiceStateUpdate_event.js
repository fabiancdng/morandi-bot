const queueSystem = require("./queue");
module.exports.handle = async (bot, oldMember, newMember, db) => {
    let oldUserChannel = oldMember.voiceChannel;
    let newUserChannel = newMember.voiceChannel;
    //Run the queue system to check if the joined channel is a queue channel.
    queueSystem.run(bot, oldMember, newMember, db, oldUserChannel, newUserChannel);
}