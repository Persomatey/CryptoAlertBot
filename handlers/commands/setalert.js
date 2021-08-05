module.exports = 
{
    name: 'setalert', 
    args: false, 
	aliases: ['addalert', 'newalert'],

    execute(message, args) 
	{
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
			// then just continue 
		}
		else
		{
			return message.channel.send("ERROR: '" + operator + "' not a valid operator. Use command `!help` for full instructions on how to use this command."); 
		}

		/* Make sure that amount is a float */
		if(isNaN(parseFloat(amount)))
		{
			return message.channel.send("ERROR: '" + args[2] + "' not a valid amount. Use command `!help` for full instructions on how to use this command."); 
		}

		cryptoURL = "https://api.cryptonator.com/api/ticker/"; 
		cryptoURL += ("" + ticker + "-" + target);  

		// Make sure that the ticker given is a valid ticker on cryptonator 
		let settings = { method: "Get" };
		fetch(cryptoURL, settings)
			.then(res => res.json())
			.then((json) => 
			{
				if(json.success == false)
				{
					mes = "ERROR: " + json.error; 
					return message.channel.send(mes); 
				}

				const newAlert = {name:"Alert"+alertList.length, user:message.author.id, ticker:ticker, operator:operator, amount:amount, target:target}; 
				alertList.push(newAlert); 

				// write to the json file 
				let newJSON = '{"alerts":['; 
				for(var i = 0; i < alertList.length; i++)
				{
					newJSON += '{"name":"' + alertList[i].name + '","user":"' + alertList[i].user + '","ticker":"' + alertList[i].ticker + '","operator":"' + alertList[i].operator + '","amount":"' + alertList[i].amount + '","target":"' + alertList[i].target + '"}'; 
					if(i != alertList.length - 1)
					{
						newJSON += ","
					}
				}
				newJSON += "]}"

				console.log("Setting new JSON info..."); 

				let req = new XMLHttpRequest();

				req.onreadystatechange = () => 
				{
					if (req.readyState == XMLHttpRequest.DONE) 
					{
						console.log(req.responseText); 
					}
				};

				let jsonURL = client.botConfig.json; 
				jsonURL = jsonURL.substring(0, jsonURL.length - 7);

				req.open("PUT", jsonURL, true);
				req.setRequestHeader("Content-Type", "application/json");
				req.setRequestHeader("X-Master-Key", client.botConfig.key);
				req.send(newJSON);

				console.log("...new JSON info set! "); 

				// Let the user know it is done 
				mes = "Set a new alert for when " + ticker + " goes " + operator + " " + amount + " " + target; 
				return message.channel.send(mes); 
			});
    },
};