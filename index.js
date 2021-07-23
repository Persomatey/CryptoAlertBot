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
const keep_alive = require('./keep_alive.js')

global.alertList = []; 

const cooldowns = new Discord.Collection(); 

let notificationCount = 0; 
let notificationArr = []; 
let isDeleting = false; 

function IncNotificationCount(elem)
{
	notificationCount++; 
	notificationArr.push(elem); 
}

function ResetAlertArray()
{
	var newData = ""; 

	for(var i = 0; i < alertList.length; i++)
	{
		if(alertList[i] != null)
		{
			if(i != alertList.length - 1)
			{
				newData += (alertList[i].name + " " + alertList[i].user + " " + alertList[i].ticker + " " + alertList[i].operator + " " + alertList[i].amount + " " + alertList[i].target) + "\n"; 
			}
			else
			{
				newData += (alertList[i].name + " " + alertList[i].user + " " + alertList[i].ticker + " " + alertList[i].operator + " " + alertList[i].amount + " " + alertList[i].target) + ""; 
			}
		}
	}

	fs.writeFile('data.txt', newData, (err) => 
	{
		if (err) throw err;
	}); 

	alertList = []; 

	let dataArray = newData.toString().split("\n");

	if (newData.toString().length > 0)
	{
		for(var i = 0; i < dataArray.length; i++)
		{
			if(i == dataArray.length)
			{
				let newAlertText = dataArray[i].toString().split(" "); 
				let newAlert = {name:"Alert"+alertList.length, user:newAlertText[1], ticker:newAlertText[2], operator:newAlertText[3], amount:newAlertText[4], target:newAlertText[5].substring(0, newAlertText[5].length - 1)}; 
				alertList.push(newAlert); 
			}
			else
			{
				let newAlertText = dataArray[i].toString().split(" "); 
				let newAlert = {name:"Alert"+alertList.length, user:newAlertText[1], ticker:newAlertText[2], operator:newAlertText[3], amount:newAlertText[4], target:newAlertText[5].substring(0, newAlertText[5].length)}; 
				alertList.push(newAlert); 
			}
		}
	}

	isDeleting = false; 
}

client.on('ready', () => 
{
	// Read data.txt for alerts 
	fs.readFile('data.txt', (err, data) => 
	{
		let dataArray = data.toString().split("\n");

		if (data.toString().length > 0)
		{
			for(var i = 0; i < dataArray.length; i++)
			{
				if(i == dataArray.length)
				{
					let newAlertText = dataArray[i].toString().split(" "); 
					let newAlert = {name:"Alert"+alertList.length, user:newAlertText[1], ticker:newAlertText[2], operator:newAlertText[3], amount:newAlertText[4], target:newAlertText[5].substring(0, newAlertText[5].length - 1)}; 
					alertList.push(newAlert); 
				}
				else
				{
					let newAlertText = dataArray[i].toString().split(" "); 
					let newAlert = {name:"Alert"+alertList.length, user:newAlertText[1], ticker:newAlertText[2], operator:newAlertText[3], amount:newAlertText[4], target:newAlertText[5].substring(0, newAlertText[5].length)}; 
					alertList.push(newAlert); 
				}
			}
		}
	}) 

	// Set up regular checks 
	var checkminutes = 0.05, checkthe_interval = checkminutes * 60 * 1000; 
	setInterval(function() 
	{
		if(alertList.length > 0)
		{
			if (isDeleting == false && notificationCount > 0)
			{
				isDeleting = true; 
				for(var i = 0; i < notificationCount; i++)
				{
					delete alertList[notificationArr[i]]; 
				}
				notificationCount = 0; 
				notificationArr = []; 
				ResetAlertArray(); 
			}
			else if (isDeleting == false && notificationCount < 0)
			{
				notificationCount = 0;
			}
			else if (isDeleting == false && notificationCount == 0)
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

						var newData = ""; 

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
										var index = parseInt( name.substring(5, name.length) ); 
										IncNotificationCount(index); 
									}
								}

								if(operator == "below")
								{
									if(parseFloat(json.ticker.price) < amount)
									{
										let privateMessage = "ALERT: " + ticker + "'s value has fallen below " + amount + " " + target + "! \nYour alert `" + name + "` for `When " + ticker + " goes " + operator + " " + amount + " " + target + "` will now be deleted. "; 
										client.users.fetch(userID).then(user => user.send(privateMessage));
										var index = parseInt( name.substring(5, name.length) ); 
										IncNotificationCount(index); 
									}
								}
							});
					}
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