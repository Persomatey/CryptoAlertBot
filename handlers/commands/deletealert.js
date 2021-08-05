module.exports = 
{
    name: 'deletealert', 
    args: false, 
	aliases: ['clearalert', 'erasealert', 'removealert'],

    execute(message, args) 
	{
		const fetch = require("node-fetch");
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var mes = ""; 
		var error = 'ERROR: Invalid use of command. Use command `' + client.botConfig.prefix + 'help` for full instructions on how to use this command.'; 
		var element; 
		if(args.length < 1 || args.length > 1)
		{
			return message.channel.send(error); 
		}

		if(args[0] == "0")
		{
			mes = alertList[0].name + " is now deleted. "; 
			delete alertList[0]; 
		}
		else
		{
			if ( parseInt(args[0]) )
			{
				element = parseInt(args[0]); 

				if(element == alertList.length - 1)
				{
					mes = alertList[element].name + " is now deleted. "; 
					delete alertList[element]; 
					alertList.pop(); 
				}
				else
				{
					if(element < 0)
					{
						return message.channel.send(error); 
					}
					if(element > alertList.length - 1)
					{
						return message.channel.send(error); 
					}

					mes = alertList[element].name + " is now deleted. "; 
					delete alertList[element]; 
				}
			}
			else
			{
				return message.channel.send(error); 
			}
		}

		// Making new JSON text 
		let newJSON = '{"alerts":['; 
		var validCount = 0; 
		for(var i = 0; i < alertList.length; i++)
		{
			if(alertList[i] != null)
			{
				newJSON += '{"name":"Alert' + (validCount++) + '","user":"' + alertList[i].user + '","ticker":"' + alertList[i].ticker + '","operator":"' + alertList[i].operator + '","amount":"' + alertList[i].amount + '","target":"' + alertList[i].target + '"}'; 
				if(i != alertList.length - 1)
				{
					newJSON += ","
				}
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

		// Emptying alertList
		alertList = []; 

		// Importing new alerts 
		setTimeout(function()
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

				return message.channel.send(mes); 
			});
		}, 500);
    },
};