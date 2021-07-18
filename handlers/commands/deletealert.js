module.exports = {
    name: 'deletealert', // The name of the command
    description: '', // The description of the command (for help text)
    args: false, // Specified that this command doesn't need any data other than the command
    usage: '', // Help text to explain how to use the command (if it had any arguments)

    execute(message, args) 
	{
		var mes = ""; 
		var error = 'ERROR: Invalid use of command. Use command `!help` for full instructions on how to use this command.';
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
				if(element < 0)
				{
					return message.channel.send(error); 
				}
				mes = alertList[element].name + " is now deleted. "; 
				delete alertList[element]; 
			}
			else
			{
				return message.channel.send(error); 
			}
		}

		return message.channel.send(mes); 
    },
};