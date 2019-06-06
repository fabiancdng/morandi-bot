module.exports.sendEmbed = async (channel, color, title, description) => {
    const discord = require("discord.js");
    
    //Colors
    if(color == "red") color = 0xde1313;
    if(color == "green") color = 0x438900;
    if(color == "blue") color = 0x0097ff;
    if(color == "purple") color = 0xbd00ff;
    if(color == "pink") color = 0xff00fb;
    if(color == "gold") color = 0xffa200;

    let emb = new discord.RichEmbed({title: title, color: color, description: description});

    channel.send(emb);
}