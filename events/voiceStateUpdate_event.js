const discord = require("discord.js");
const mysql = require("mysql");
const config = require("../config");
module.exports.handle = async (bot, oldMember, newMember, db) => {
    let oldUserChannel = oldMember.voiceChannel;
    let newUserChannel = newMember.voiceChannel;
    var queue_channel;
    if (newUserChannel == undefined) { return; }
    else {
        db.query("SELECT queue FROM guilds WHERE guild_id = '"+newUserChannel.guild.id.toString()+"'", (e, r, f) => {
            if(!r[0]) return;
            if(newUserChannel.id == r[0].queue) {
                queue_channel = r[0].queue;
                let emb = new discord.RichEmbed({
                    title: "Ticket created",
                    color: 0xffa200,
                    description: "You joined a queue channel, so your ticket was created.\nSomemone permitted will claim it soon and then you will be notified." 
                });
                newMember.send(emb);

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

                    supporters.forEach(supporter_id => {
                        let msg = new discord.RichEmbed({
                            title: "New ticket",
                            color: 0xffa200,
                            description: "<@"+newMember.id+"> waits in the queue.\nTo claim the ticket, click the check-mark.\nThen the user will be moved to your current VoiceChannel."
                        });
                        bot.users.get(supporter_id).send(msg).then(mfb => {
                            mfb.react("✅");
                            let reaction_filter = (reaction, user) => reaction.emoji.name === "✅" && user.bot == false;
                            let reaction_collector = mfb.createReactionCollector(reaction_filter, {time: 6000000});
                            let newMemberUser;
                            reaction_collector.on("collect", (r) => {
                                newMemberUser = newUserChannel.guild.members.find(val => val.id == newMember.id);
                                if(r.users.last().voiceChannel == undefined) {
                                    
                                    let lastUser = newUserChannel.guild.members.find(val => val.id == r.users.last().id);
                                        if(lastUser.voiceChannel == undefined) {
                                            emb = new discord.RichEmbed({
                                                title: "",
                                                color: 0xde1313,
                                                description: "You must be in a voice channel. Go in a voice channel and react again."
                                            });
                                            lastUser.send(emb); 
                                        } else {
                                            if(newMemberUser.voiceChannel.id.toString() != queue_channel) {
                                                emb = new discord.RichEmbed({
                                                    title: "Ticket expired",
                                                    color: 0xde1313,
                                                    description: "The user alredy left the queue."
                                                });
                                                r.users.last().send(emb);
                                                return;
                                            } else {
                                                let supporter = newUserChannel.guild.members.find(val => val.id == r.users.last().id);
                                                emb = new discord.RichEmbed({
                                                title: "Your ticket was claimed.",
                                                color: 0x438900,
                                                description: "Your ticket was claimed by <@"+supporter.id+">.\nYou will be moved automatically in a few seconds."});
                                                newMember.send(emb);
                                                newMember.setVoiceChannel(supporter.voiceChannel);
                                            }
                                        }
                                    return;
                                }
                            });
                            reaction_collector.on("end", () => {
                                emb = new discord.RichEmbed({
                                    title: "Your ticket was not claimed.",
                                    color: 0xde1313,
                                    description: "I'm sorry.\nYour ticket was not claimed by anyone permitted.\nYou can try it again later."
                                });
                                newMember.send(emb);
                                newMember.setVoiceChannel(null);
                            });
                        });
                        
                    });
                
                });
            }
        });     
    }
}