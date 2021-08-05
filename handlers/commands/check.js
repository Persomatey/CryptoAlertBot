module.exports = 
{
    name: 'check', 
    args: false, 
	aliases: ['compare', 'value'],

    execute(message, args) 
	{
		const fetch = require("node-fetch");
		let mes = "TEMP"; 
		let error = 'ERROR: Invalid use of command. Use command `' + client.botConfig.prefix + 'help` for full instructions on how to use this command.'; 

		// Make sure that arguments are set up correctly 
		if(args.length < 2 || args.length > 2 || args.length == 0)
		{
			return message.channel.send(error); 
		}

		var ticker = args[0].toUpperCase(); ; 
		var target = args[1].toUpperCase(); ; 

		cryptoURL = "https://api.cryptonator.com/api/ticker/"; 
		cryptoURL += ("" + ticker + "-" + target); 

		var value = "";  

		let settings = { method: "Get" };

		fetch(cryptoURL, settings)
			.then(res => res.json())
			.then((json) => 
			{
				if(json.success == true)
				{
					value = json.ticker.price; 
					mes = ticker + " price is " + value + " " + target; 
				}
				else
				{
					mes = "ERROR: " + json.error; 
				}

				return message.channel.send(mes); 
			});
    },
};