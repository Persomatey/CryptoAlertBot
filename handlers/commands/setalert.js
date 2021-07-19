/*
 * How to use !alert 'cryptoName' 'above/below' 'amount' 'target'
 * Example: '!alert ethereum above 2000' sets an alert for Ethereum when it goes above $2000 USD 
 */

module.exports = 
{
    name: 'setalert', 
    description: 'Adds a crypto to check', 
    args: false, 
    usage: '', 

    execute(message, args) 
	{
		const fetch = require("node-fetch");
		let mes = "TEMP"; 

		var ticker = args[0].toUpperCase(); 
		var operator = args[1]; 
		var amount = parseFloat(args[2]); 
		var target = args[3].toUpperCase(); 

		/* Make sure that arguments are set up correctly */
		if(args.length < 4 || args.length > 4)
		{
			return message.channel.send("ERROR: Invalid use of command. Use command `!help` for full instructions on how to use this command."); 
		}

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
					mes = "Set a new alert for when " + ticker + " goes " + operator + " " + amount + " " + target; 
				}
				else
				{
					mes = "ERROR: " + json.error; 
					return message.channel.send(mes); 
				}
				const newAlert = {name:"Alert"+alertList.length, user:message.author.id, ticker:ticker, operator:operator, amount:amount, target:target}; 
				alertList.push(newAlert); 

				return message.channel.send(mes); 
			});
    },
};