module.exports = 
{
    name: 'help', 
    args: false, 
    aliases: ['helpme', 'commands', 'howto', 'tutorial'],

    execute(message, args) 
	{
		const { MessageEmbed } = require("discord.js")

        let embed = new MessageEmbed() 
			.setColor("BLACK")
			.setDescription(
				"**List of commands** \n" + 
				"`" + client.botConfig.prefix + "setalert`: Set an alert for a given asset. \n" + 
				"`" + client.botConfig.prefix + "check`: Checks a given asset's value against a target asset. \n" + 
				"`" + client.botConfig.prefix + "allalerts`: Displays all alerts currently set. \n" + 
				"`" + client.botConfig.prefix + "deletealert`: Deletes an alert given a number (`" + client.botConfig.prefix + "allalerts` for number). \n" + 
				"`" + client.botConfig.prefix + "help`: Displays a list of all commands as well as usage. \n" + 
				"`" + client.botConfig.prefix + "about`: Displays some miscellaneous info about this bot. \n \n" + 
				"**Usage** \n" + 
				"`" + client.botConfig.prefix + "setalert` arguments should be `cryptoName` `operator` `amount` `targetName`. \n" + 
				"Ex. `" + client.botConfig.prefix + "setalert BTC below 1 USD` sets an alert for if BTC falls below $1. \n" + 
				"Ex. `" + client.botConfig.prefix + "setalert DOGE above 1 EUR` sets an alert for if DOGE rises above €1. \n" + 
				"`" + client.botConfig.prefix + "check` arguments should be `cryptoName` `target`. \n" + 
				"Ex. `" + client.botConfig.prefix + "check ETH USD` checks ETH's value compared to USD. \n" +
				"Ex. `" + client.botConfig.prefix + "check LTC BTC` checks LTC's value compared to BTC. \n" +
				"`" + client.botConfig.prefix + "deletealert` arguments should be a number. \n" + 
				"Ex. `" + client.botConfig.prefix + "deletealert 4` deletes Alert4. \n \n" + 
				"**Aliases** (alternate ways to call commands)\n" + 
				"`" + client.botConfig.prefix + "setalert` : `" + client.botConfig.prefix + "addalert`, `" + client.botConfig.prefix + "newalert` \n " + 
				"`" + client.botConfig.prefix + "check` : `" + client.botConfig.prefix + "compare`, `" + client.botConfig.prefix + "value` \n " + 
				"`" + client.botConfig.prefix + "allalerts` : `" + client.botConfig.prefix + "displayalerts`, `" + client.botConfig.prefix + "showalerts`, `" + client.botConfig.prefix + "readalerts` \n " + 
				"`" + client.botConfig.prefix + "deletealert` : `" + client.botConfig.prefix + "clearalert`, `" + client.botConfig.prefix + "erasealert`, `" + client.botConfig.prefix + "removealert` \n " +
				"`" + client.botConfig.prefix + "help` : `" + client.botConfig.prefix + "helpme`, `" + client.botConfig.prefix + "commands`, `" + client.botConfig.prefix + "howto`, `" + client.botConfig.prefix + "tutorial` \n" +
				"`" + client.botConfig.prefix + "about` : `" + client.botConfig.prefix + "aboutbot`, `" + client.botConfig.prefix + "info` \n" 
			)
			.setFooter("All pricing is set according to Cryptonator's calculator (https://www.cryptonator.com/)"); 

		return message.channel.send(embed); 
    },
};
