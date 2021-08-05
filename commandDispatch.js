module.exports = 
{
	handle(client, message, cooldowns) 
	{
		// Ignore bot messages and messages that dont start with the prefix defined in the config file
		if(!message.content.startsWith(client.botConfig.prefix) || message.author.bot) return;

		// Split commands and arguments from message so they can be passed to functions
		const args = message.content.slice(client.botConfig.prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();

		// If the command isn't in the  command folder, move on
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if(!command) return;

		// If the command requires arguments, make sure they're there.
		if (command.args && !args.length) 
		{
			let reply = 'That command requires more details!';

			// If we have details on how to use the args, provide them
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${client.botConfig.prefix}${command.name} ${command.usage}\``;
			}

			// Send a reply from the bot about any error encountered
			return message.channel.send(reply);
		}

		try 
		{
			// Run the command
			command.execute(message, args); 
		}
		catch(error) 
		{
			console.error(error);
		}
	}
}