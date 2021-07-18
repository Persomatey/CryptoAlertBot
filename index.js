// install Discord.js 'npm i discord.js' 

const fs = require('fs');
const fetch = require("node-fetch");
const Discord = require('discord.js');
const Config = require('./config.json');
const BotLib = require('./bot.js');
const Commands = require('./commandDispatch');
const client = new Discord.Client(); 
global.globalClient = client; 
client.botConfig = Config; 
client.botConfig.rootDir = __dirname; 
BotLib.loadHandlers(client, 'commands');

global.alertList = []; 

const cooldowns = new Discord.Collection(); 

function DeleteArrayElement(newElement)
{
	delete alertList[newElement]; 
}

client.on('ready', () => 
{
		var checkminutes = 0.1, checkthe_interval = checkminutes * 60 * 1000; 
		setInterval(function() 
		{
			if(alertList.length > 0)
			{
				for(var i = 0; i < alertList.length; i++)
				{
					if(alertList[i] != null)
					{
						cryptoURL = "https://api.cryptonator.com/api/ticker/"; 
						cryptoURL += ("" + alertList[i].ticker + "-" + alertList[i].target);  

						let name = alertList[i].name; 
						let userID = alertList[i].user; 
						let ticker = alertList[i].ticker; 
						let operator = alertList[i].operator; 
						let amount = alertList[i].amount; 
						let target = alertList[i].target; 

						let settings = { method: "Get" };
						fetch(cryptoURL, settings)
							.then(res => res.json())
							.then((json) => 
							{
								if(operator == "above")
								{
									if(parseFloat(json.ticker.price) > amount)
									{
										let privateMessage = "ALERT: " + ticker + "'s value has risen above " + amount + " " + target + "! \nYour alert `" + name + "` for `When " + ticker + " goes " + operator + " " + amount + " " + target + "` will now be deleted. "; 
										client.users.fetch(userID).then(user => user.send(privateMessage)); 
										DeleteArrayElement(i - 1); 
									}
								}

								if(operator == "below")
								{
									if(parseFloat(json.ticker.price) < amount)
									{
										let privateMessage = "ALERT: " + ticker + "'s value has fallen below " + amount + " " + target + "! \nYour alert `" + name + "` for `When " + ticker + " goes " + operator + " " + amount + " " + target + "` will now be deleted. "; 
										client.users.fetch(userID).then(user => user.send(privateMessage));
									}
								}
							});
					}
				}
			}
		}, checkthe_interval);

	client.user.setActivity(
	{
		name: '!help',
		type: 0
	});
	
    console.log('Bot Online');
});

client.on('message', message => 
{
    if(Commands.handle(client, message, cooldowns)) 
	{
        return;
    }
});

client.login(client.botConfig.token).catch((err) => 
{
    console.log(`Failed to authenticate with Discord network: "${err.message}"`);
});