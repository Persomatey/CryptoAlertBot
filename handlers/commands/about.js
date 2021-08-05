module.exports = 
{
    name: 'about', 
    args: false, 
    aliases: ['aboutbot', 'info'],

    execute(message, args) 
	{
		const { MessageEmbed } = require("discord.js")

        let embed = new MessageEmbed() 
			.setColor("BLACK")
			.setTitle("About")
			.setDescription(
				"This bot was solo developed by Hunter Goodin (https://huntergoodin.com/). " +
				"All code was written in Javascript using Node.js with the Discord.js framework. " + 
				"Pricing is kept up to date with Cryptonator's API (https://www.cryptonator.com/). " + 
				"JSON file storage/hosting done by jsonbin.io (https://jsonbin.io/). " +
				"JSON reading/writing done using jsonbin.io's API. " +
				"A repository of this bot's code can be viewed at https://github.com/Persomatey/CryptoAlertBot " + 
				"including a complete changelist and instructions on how to set up this bot. "
			)

		return message.channel.send(embed); 
    },
};
