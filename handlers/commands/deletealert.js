module.exports = {
    name: 'deletealert', 
    args: false, 
	aliases: ['clearalert', 'erasealert', 'removealert'],

    execute(message, args) 
	{
		const fs = require('fs'); 

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

				if(element == alertList.length - 1)
				{
					mes = alertList[element].name + " is now deleted. "; 
					delete alertList[element]; 
					alertList.pop(); 
				}
				else
				{
					if(element < 0)
					{
						return message.channel.send(error); 
					}
					if(element > alertList.length - 1)
					{
						return message.channel.send(error); 
					}

					mes = alertList[element].name + " is now deleted. "; 
					delete alertList[element]; 
				}
			}
			else
			{
				return message.channel.send(error); 
			}
		}

		var newData = "";  

		for(var i = 0; i < alertList.length; i++)
		{
			if(alertList[i] != null)
			{
				if(i != alertList.length - 1)
				{
					let newStr = alertList[i].name + " " + alertList[i].user + " " + alertList[i].ticker + " " + alertList[i].operator + " " + alertList[i].amount + " " + alertList[i].target + "\n"
					newData += newStr; 
				}
				else
				{
					let newStr = alertList[i].name + " " + alertList[i].user + " " + alertList[i].ticker + " " + alertList[i].operator + " " + alertList[i].amount + " " + alertList[i].target + ""
					newData += newStr; 
				}
			}
		}

		fs.writeFile('data.txt', newData, (err) => 
		{
			if (err) throw err;
		}); 

		alertList = []; 
		
		let dataArray = newData.toString().split("\n");

		if (newData.toString().length > 0)
		{
			for(var i = 0; i < dataArray.length; i++)
			{
				if(i == dataArray.length)
				{
					let newAlertText = dataArray[i].toString().split(" "); 
					let newAlert = {name:"Alert"+alertList.length, user:newAlertText[1], ticker:newAlertText[2], operator:newAlertText[3], amount:newAlertText[4], target:newAlertText[5].substring(0, newAlertText[5].length - 1)}; 
					alertList.push(newAlert); 
				}
				else
				{
					let newAlertText = dataArray[i].toString().split(" "); 
					let newAlert = {name:"Alert"+alertList.length, user:newAlertText[1], ticker:newAlertText[2], operator:newAlertText[3], amount:newAlertText[4], target:newAlertText[5].substring(0, newAlertText[5].length)}; 
					alertList.push(newAlert); 
				}
			}
		}

		return message.channel.send(mes); 
    },
};