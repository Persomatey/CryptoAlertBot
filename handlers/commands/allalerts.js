module.exports = {
    name: 'allalerts', // The name of the command
    description: '', // The description of the command (for help text)
    args: false, // Specified that this command doesn't need any data other than the command
    usage: '', // Help text to explain how to use the command (if it had any arguments)

    execute(message, args) 
	{
		let mes = ""; 

		if(alertList.length > 0)
		{
			for (var i = 0; i < alertList.length; i++)
			{
				if(alertList[i] != null)
				{
					mes += "`" + alertList[i].name + "`: When " + alertList[i].ticker + " goes " + alertList[i].operator + " " + alertList[i].amount + " " + alertList[i].target + " (" + globalClient.users.cache.find(user => user.id === alertList[i].user).username + ")\n"; 
				}
			}

			//return message.channel.send(mes); 
		}
		else 
		{
			mes = "There are no alerts currently set. To set an alert, you can use the `!alert` command. "; 
			return message.channel.send(mes); 
		}

		if (mes == "")
		{
			mes = "There are no alerts currently set. To set an alert, you can use the `!alert` command. "; 
			return message.channel.send(mes); 
		}

		const { MessageEmbed } = require("discord.js")

        let embed = new MessageEmbed() 
			.setColor("BLACK")
			.setTitle("All Current Alerts")
			.setDescription(mes)

		return message.channel.send(embed); 
    },
};