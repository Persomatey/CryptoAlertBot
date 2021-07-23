module.exports = {
    name: 'help', // The name of the command
    description: '', // The description of the command (for help text)
    args: false, // Specified that this command doesn't need any data other than the command
    usage: '', // Help text to explain how to use the command (if it had any arguments)

    execute(message, args) 
	{
		const { MessageEmbed } = require("discord.js")

        let embed = new MessageEmbed() 
			.setColor("BLACK")
			//.setTitle("Help")
			.setDescription(
				"**List of commands** \n" + 
				"`!setalert`: Set an alert for a given crypto that private messages you if alert occurs. \n" + 
				"`!check`: Checks a given crypto's value against a target currency. \n" + 
				"`!allalerts`: Displays all alerts currently running. \n" + 
				"`!deletealert`: Deletes an alert given a number (`!allalerts` for number). \n" + 
				"`!clearalerts`: Deletes all alerts. \n" + 
				"`!help`: Displays a list of all commands as well as usage. \n \n" + 
				"**Usage** \n" + 
				"Arguments for `!alert` should be `cryptoName` `operator` `amount` `target`. \n" + 
				"Arguments for `!check` should be `cryptoName` `target`. \n" + 
				"Argument for `!deletealert` should be a number. \n" + 
				"Ex. `!setalert BTC below 1 USD` sets an alert for if BTC falls below $1. \n" + 
				"Ex. `!setalert DOGE above 1 EUR` sets an alert for if DOGE rises above €1. \n" + 
				"Ex. `!check ETH USD` checks ETH's value compared to USD. \n" +
				"Ex. `!check LTC BTC` checks LTC's value compared to BTC. \n" +
				"Ex. `!deletealert 4` deletes Alert4. \n"
			)
			.setFooter("All pricing is set according to Cryptonator's calculator (https://www.cryptonator.com/)"); 

		return message.channel.send(embed); 
    },
};