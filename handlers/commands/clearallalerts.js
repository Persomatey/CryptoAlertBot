module.exports = 
{
	name: 'clearallalerts', 
    args: false, 
	aliases: ['deleteallalerts', 'eraseallalerts', 'removeallalerts'],

	execute(message, args) 
	{
		const fs = require('fs'); 

		var newData = ""; 

		fs.writeFile('data.txt', newData, (err) => 
		{
			if (err) throw err;
		}); 

		alertList = []; 

		return message.channel.send('All alerts are cleared! There are now no more alerts.'); 
	}
}