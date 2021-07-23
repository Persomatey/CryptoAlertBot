module.exports = 
{
    name: 'setalert', 
    args: false, 
	aliases: ['addalert', 'newalert'],

    execute(message, args) 
	{
		const fs = require('fs');
		const fetch = require("node-fetch");
		let mes = "TEMP"; 

		/* Make sure that arguments are set up correctly */
		if(args.length < 4 || args.length > 4)
		{
			return message.channel.send("ERROR: Invalid use of command. Use command `!help` for full instructions on how to use this command."); 
		}

		var ticker = args[0].toUpperCase(); 
		var operator = args[1]; 
		var amount = parseFloat(args[2]); 
		var target = args[3].toUpperCase(); 

		/* Make sure that operation is valid */
		if (operator == "above" || operator == "below")	// if operator isn't 'above' or 'below' 
		{
			// This is only set up like this because apparently Javascript doesn't work correctly with NOT operators 
		}
		else
		{
			return message.channel.send("ERROR: '" + operator + "' not a valid operator. Use command `!help` for full instructions on how to use this command."); 
		}

		/* Make sure that amount is a float */
		if(isNaN(parseFloat(amount)))
		{
			return message.channel.send("ERROR: '" + args[2] + "' not a valid amount in USD. Use command `!help` for full instructions on how to use this command."); 
		}

		cryptoURL = "https://api.cryptonator.com/api/ticker/"; 
		cryptoURL += ("" + ticker + "-" + target);  

		let settings = { method: "Get" };
		fetch(cryptoURL, settings)
			.then(res => res.json())
			.then((json) => 
			{
				if(json.success == true)
				{
					//mes = "Set a new alert for when " + ticker + " goes " + operator + " " + amount + " " + target; 
				}
				else
				{
					mes = "ERROR: " + json.error; 
					return message.channel.send(mes); 
				}
				const newAlert = {name:"Alert"+alertList.length, user:message.author.id, ticker:ticker, operator:operator, amount:amount, target:target}; 
				alertList.push(newAlert); 

				// write to data.txt 

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

				mes = "Set a new alert for when " + ticker + " goes " + operator + " " + amount + " " + target; 
				return message.channel.send(mes); 
			});
    },
};