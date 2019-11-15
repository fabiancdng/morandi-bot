# Morandi Bot [ARCHIVED]

<p align="center"><img src="https://cdn.discordapp.com/avatars/584108228523065387/f762ac9bbf11dcaa6a1db8b5c6fc358d.png?size=256"></p>

## THIS REPOSITORY IS ARCHIVED.

## What is Morandi Bot?
Morandi is a discord bot developed in discord.js.
The special about Morandi: Many Discord users are missing the functionalitys of TeamSpeak support bot solutions. Not anymore! With **Morandi** you can build your own **support system** for your Discord server.

#
## Features
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

You have to host the bot on your own PC or your server.   
To do this, follow the installation guide below.

### Installation
Fist of all you have to install [Node.js](https://nodejs.org/) and npm.   
   
On linux systems just run this in the terminal:   
```git clone https://github.com/fabiancdng/morandi-bot && cd morandi-bot && npm i && npm start```   

After the installation, install mysql and go to the "morandi-bot/config.js" file and configure mysql.

Then restart the bot and it should work.

#
## About  
- Morandi uses some third party libraries:  
    + [discord.js](https://github.com/discordjs/discord.js)
    + [mysql](https://github.com/mysqljs/mysql)
    + [readline-sync](https://github.com/anseki/readline-sync)
  
- If you find a bug or something else not mentioned in this readme/in the wiki, you can open a new issue! We will be glad and hope, your problem will get fixed soon!
