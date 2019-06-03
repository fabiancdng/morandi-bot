# Morandi Bot

<p align="center"><img src="https://cdn.discordapp.com/avatars/584108228523065387/6d2b7cabb631688d9139a5159a6712ca.png?size=128"></p>

## What is Morandi Bot?
Morandi is a discord bot developed in discord.js.
The special about Morandi: Many Discord users are missing the functionalitys of TeamSpeak support bot solutions. Not anymore! With **Morandi** you can build your own **support system** for your Discord server. Find details on the wiki.
> Wiki is comming soon! 
#
## Functions
Morandi has many features for you and your discord server.

**There are moderation features like:**  
```clear <number of messages>``` - Clears chat messages.  
```autorole <role-id>``` - Each new member will get a role automatically.

**You can configurate Morandi how you like:**  
```config <config item> <setting>```  
Example: ```config prefix .``` - Set the prefix to '.'. 

**You can create a queue channel.**  
You can create a queue channel and every time a user joins this channel, each member in the role for this queue will be notified.  
```config queuechannel <channel id>```  
```config queuerole <role id>```  

**There are many more features**  
Find all commands and features at the wiki.
> Wiki is comming soon!

#
## How can I use Morandi?  
That is very easy! You can simply click on "Invite":
[Invite Morandi to your server](https://discordapp.com/oauth2/authorize?client_id=584108228523065387&permissions=8&scope=bot)

As an alternative, you can download this repository and host the bot yourself. A detailed description can be found in the wiki (link below).
> Wiki is comming soon!

#
## What are the limitations?  
- Currently, the number of queue is limited to one. But we are working to make this number get bigger. In fact, this is currently our highest priority of things. So you can expect this to be done at the next update!
- In relation to the above mentioned limitation, it is not possible at the moment to assign a role to each of the queues. But this will be fixed soon as well!

#
## About  
- Morandi uses some third party libraries:  
    + [discord.js](https://github.com/discordjs/discord.js)
    + [mysql](https://github.com/mysqljs/mysql)
  
- If you find a bug or something else not mentioned in this readme/in the wiki, you can open a new issue! We will be glad and hope, your problem will get fixed soon!