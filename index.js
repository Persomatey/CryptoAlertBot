const fetch = require("node-fetch");
const Discord = require('discord.js');
const Config = require('./config.json');
const BotLib = require('./bot.js');
const Commands = require('./commandDispatch');
const keep_alive = require('./keep_alive.js');
global.client = new Discord.Client(); 
client.botConfig = Config; 
client.botConfig.rootDir = __dirname; 
BotLib.loadHandlers(client, 'commands');
require('dotenv').config(); 
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
	// Making a new list without the recently deleted notification 
	var newList = []; 

	for(var i = 0; i < alertList.length; i++)
	{
		if(alertList[i] != null)
		{
			const newAlert = {name:"Alert"+newList.length, user:alertList[i].user, ticker:alertList[i].ticker, operator:alertList[i].operator, amount:alertList[i].amount, target:alertList[i].target}; 
			newList.push(newAlert);
			console.log("Pushing " + newAlert.name + " for " + newAlert.ticker + " to newList"); 
		}
	}

	// making new JSON text 
	let newJSON = '{"alerts":['; 
	for(var i = 0; i < newList.length; i++)
	{
		newJSON += '{"name":"' + newList[i].name + '","user":"' + newList[i].user + '","ticker":"' + newList[i].ticker + '","operator":"' + newList[i].operator + '","amount":"' + newList[i].amount + '","target":"' + newList[i].target + '"}'; 
		if(i != newList.length - 1)
		{
			newJSON += ","
		}
	}
	newJSON += "]}"

	// Writing to JSON file 
	let req = new XMLHttpRequest();
	req.onreadystatechange = () => 
	{
		if (req.readyState == XMLHttpRequest.DONE) 
		{
			console.log(req.responseText); 
		}
	};

	let jsonURL = client.botConfig.json; 
	jsonURLShortened = jsonURL.substring(0, jsonURL.length - 7);

	req.open("PUT", jsonURLShortened, true);
	req.setRequestHeader("Content-Type", "application/json");
	req.setRequestHeader("X-Master-Key", client.botConfig.key);
	req.send(newJSON);

	// Importing new alerts 
	setTimeout(function()
	{ 
		alertList = []; 
		let settings = { method: "Get" }; 
		fetch(client.botConfig.json, settings)
		.then(res => res.json())
		.then((json) => 
		{
			console.log("Importing alerts..."); 
			for(var i = 0; i < json.alerts.length; i++)
			{
				let jsonAlertName = json.alerts[i].name; 
				let jsonAlertUser = json.alerts[i].user; 
				let jsonAlertTicker = json.alerts[i].ticker; 
				let jsonAlertOperator = json.alerts[i].operator; 
				let jsonAlertAmount = json.alerts[i].amount; 
				let jsonAlertTarget = json.alerts[i].target; 
				console.log("...importing Name=" + jsonAlertName + " User=" + jsonAlertUser + " Ticker=" + jsonAlertTicker + " Operator=" + jsonAlertOperator + " Amount=" + jsonAlertAmount + " Target=" + jsonAlertTarget + "..."); 
				
				const newAlert = {name:"Alert"+alertList.length, user:jsonAlertUser, ticker:jsonAlertTicker, operator:jsonAlertOperator, amount:jsonAlertAmount, target:jsonAlertTarget}; 
				alertList.push(newAlert); 
			}
			console.log("...import complete!"); 
		});
	}, 500);

	isDeleting = false; 
}

client.on('ready', () => 
{
	let settings = { method: "Get" }; 
	fetch(client.botConfig.json, settings)
		.then(res => res.json())
		.then((json) => 
		{
			console.log("Importing alerts..."); 
			for(var i = 0; i < json.alerts.length; i++)
			{
				let jsonAlertName = json.alerts[i].name; 
				let jsonAlertUser = json.alerts[i].user; 
				let jsonAlertTicker = json.alerts[i].ticker; 
				let jsonAlertOperator = json.alerts[i].operator; 
				let jsonAlertAmount = json.alerts[i].amount; 
				let jsonAlertTarget = json.alerts[i].target; 
				console.log("...importing Name=" + jsonAlertName + " User=" + jsonAlertUser + " Ticker=" + jsonAlertTicker + " Operator=" + jsonAlertOperator + " Amount=" + jsonAlertAmount + " Target=" + jsonAlertTarget + "..."); 
				
				const newAlert = {name:"Alert"+alertList.length, user:jsonAlertUser, ticker:jsonAlertTicker, operator:jsonAlertOperator, amount:jsonAlertAmount, target:jsonAlertTarget}; 
				alertList.push(newAlert); 
			}
			console.log("...import complete!"); 

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
				name: client.botConfig.prefix + 'help',
				type: 0
			});
			
			console.log('Bot Online');
		});
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