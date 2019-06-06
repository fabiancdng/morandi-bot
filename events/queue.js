const discord = require("discord.js");
const embedUtil = require("../utils/embed-util");
module.exports.run = async (bot, oldMember, newMember, db, oldUserChannel, newUserChannel) => {
    if (newUserChannel == undefined) return;
    else {
    var queue_channel;
    var ticketTime = 2000;
        db.query("SELECT queue FROM guilds WHERE guild_id = '"+newUserChannel.guild.id.toString()+"'", (e, r, f) => {
            if(!r[0]) return;
            if(newUserChannel.id == r[0].queue) {
                queue_channel = r[0].queue;
                embedUtil.sendEmbed(newMember, "green", "Ticket created", "You joined a queue channel, so your ticket was created.\nSomemone permitted will claim it soon and then you will be notified.");
                db.query("SELECT queue_role FROM guilds WHERE guild_id = '"+newUserChannel.guild.id.toString()+"'", (e, r) => {
                    if(e) throw e;

                    let supporters = [];
                    let queue_role = r[0].queue_role;

                    newUserChannel.guild.members.forEach(member => {
                        member.roles.forEach(role => {
                            if (role.id == queue_role) {
                                supporters.push(member.id);
                            }
                        });
                    });
                    
                    //Timer to delete the ticket, if it wasn't claimed.
                    setTimeout(() => {
                        embedUtil.sendEmbed(newMember, "red", "Your ticket was not claimed.", "I'm sorry.\nYour ticket was not claimed by anyone permitted.\nYou can try it again later.");
                        newMember.setVoiceChannel(null);
                    }, ticketTime + 200);

                    //Send a message to each supporter.
                    supporters.forEach(supporter_id => {
                        let msg = new discord.RichEmbed({title: "New ticket", color: 0xffa200,
                            description: "<@"+newMember.id+"> waits in the queue.\nTo claim the ticket, click the check-mark.\nThen the user will be moved to your current VoiceChannel."
                        });
                        bot.users.get(supporter_id).send(msg).then(mfb => {
                            mfb.react("✅");
                            let reaction_filter = (reaction, user) => reaction.emoji.name === "✅" && user.bot == false;
                            let reaction_collector = mfb.createReactionCollector(reaction_filter, {time: ticketTime});
                            let newMemberUser;
                            reaction_collector.on("collect", (r) => {
                                newMemberUser = newUserChannel.guild.members.find(val => val.id == newMember.id);
                                if(r.users.last().voiceChannel == undefined) {
                                    
                                    let lastUser = newUserChannel.guild.members.find(val => val.id == r.users.last().id);
                                        if(lastUser.voiceChannel == undefined) {
                                            embedUtil.sendEmbed(lastUser, "red", "", "You have to be in a voice channel. Go in a voice channel and react again.");
                                        } else {
                                            if(newMemberUser.voiceChannel.id.toString() != queue_channel) {
                                                embedUtil.sendEmbed(r.users.last(), "red", "Ticket expired", "The user alredy left the queue.");
                                                return;
                                            } else {
                                                let supporter = newUserChannel.guild.members.find(val => val.id == r.users.last().id);
                                                embedUtil.sendEmbed(newMember, "green", "Your ticket was claimed.", "Your ticket was claimed by <@"+supporter.id+">.\nYou will be moved automatically in a few seconds.");
                                                newMember.setVoiceChannel(supporter.voiceChannel);
                                            }
                                        }
                                    return;
                                }
                            });
                            reaction_collector.on("end", () => {
                                mfb.delete();
                            });
                        });
                        
                    });
                
                });
            }
        });
    }
}