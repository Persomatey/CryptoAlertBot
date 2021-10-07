module.exports = 
{
    name: 'allalerts',  
    args: false, 
	aliases: ['displayalerts', 'showalerts', 'readalerts'],

    execute(message, args) 
	{
		let mes = ""; 

		if(alertList.length > 0)
		{
			for (var i = 0; i < alertList.length; i++)
			{
				if(alertList[i] != null && alertList[i].user == message.author.id)
				{
					console.log("including" + alertList[i].name + " in embed because message's user is " + alertList[i].user + " which is the same as" + alertList[i] + "'s user:" + message.author.id); 
					mes += "`" + alertList[i].name + "`: When " + alertList[i].ticker + " goes " + alertList[i].operator + " " + alertList[i].amount + " " + alertList[i].target + "\n"; 
				}
			}
		}
		else 
		{
			mes = "There are no alerts currently set. To set an alert, you can use the `" + client.botConfig.prefix + "alert` command. "; 
			return message.channel.send(mes); 
		}

		if (mes == "")
		{
			mes = "There are no alerts currently set. To set an alert, you can use the `" + client.botConfig.prefix + "alert` command. "; 
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