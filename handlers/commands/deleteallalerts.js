module.exports = 
{
	name: 'deleteallalerts', 
    args: false, 
	aliases: ['clearallalerts', 'eraseallalerts', 'removeallalerts'],

	execute(message, args) 
	{
		/*
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

		var newJSON = '{"alerts":[]}';

		let req = new XMLHttpRequest();
		req.onreadystatechange = () => 
		{
			if (req.readyState == XMLHttpRequest.DONE) 
			{
				console.log(req.responseText); 
			}
		};

		let jsonURL = client.botConfig.json; 
		jsonURLShortened = jsonURL.substring(0, jsonURL.length - 7);

		req.open("PUT", jsonURLShortened, true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", client.botConfig.key);
		req.send(newJSON);

		alertList = []; 

		return message.channel.send('All alerts are cleared! There are now no more alerts.'); 
		//*/
		return message.channel.send('This command has been deprecated. You may delete alerts manually using the `' + globalConfig.prefix + "deletealert` command."); 
	}
}