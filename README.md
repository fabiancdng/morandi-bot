# Morandi Bot

<p align="center"><img src="https://cdn.discordapp.com/avatars/584108228523065387/6d2b7cabb631688d9139a5159a6712ca.png?size=128"></p>

## What is Morandi Bot?
Morandi is a discord bot developed in discord.js.
The special about Morandi: Many Discord users are missing the functionalitys of TeamSpeak support bot solutions. Not anymore! With **Morandi** you can build your own **support system** for your Discord server.

#
## Functions
Morandi has many features for you and your discord server.

**There are moderation features like:**  
```clear <number of messages> - Clears chat messages.```  
```autorole <role-id> - Each new member will get a role automatically. ```

**You can configurate Morandi how you like:**  
```config <config item> <setting>```  
Example: ```config prefix . - Set the prefix to '.'.```

**You can create a queue channel.**  
You can create a queue channel and every time a user joins this channel, each member in the role for this queue will be notified.  
```config queuechannel <channel id>```  
```config queuerole <role id>```  

**There are many more features**
> [List of all commands](https://github.com/fabiancdng/morandi-bot/wiki/Commands#help-and-config)

#
## How can I use Morandi?  
That is very easy! You can simply click on "Invite":
[Invite Morandi to your server](https://discordapp.com/oauth2/authorize?client_id=584108228523065387&permissions=8&scope=bot)

The best way to use it is, to host the bot on your own PC or your server.   
To do this, follow the installation guide below.

### Installation
Fist of all you have to install [Node.js](https://nodejs.org/) and npm.   
   
On linux systems just run this in the terminal:   
```git clone https://github.com/fabiancdng/morandi-bot && cd morandi-bot && npm i && npm start```   
   
For windows system a installation (batch) script is comming soon!   
   
After the installation, install mysql and go to the "morandi-bot/config.js" file and configure mysql.

Then restart the bot and it should work.

#
## What things we will improve soon?  
- Currently, the number of queue is limited to one. But we are working to make this number get bigger. In fact, this is currently our highest priority of things. So you can expect this to be done at the next update!
- In relation to the above mentioned limitation, it is not possible at the moment to assign a role to each of the queues. But this will be fixed soon as well!

#
## About  
- Morandi uses some third party libraries:  
    + [discord.js](https://github.com/discordjs/discord.js)
    + [mysql](https://github.com/mysqljs/mysql)
    + [readline-sync](https://github.com/anseki/readline-sync)
  
- If you find a bug or something else not mentioned in this readme/in the wiki, you can open a new issue! We will be glad and hope, your problem will get fixed soon!