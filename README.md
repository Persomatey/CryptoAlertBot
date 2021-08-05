# Crypto Alert Bot
 
<i>A Discord bot that checks an asset's value and alerts the user if an asset has reached a specific value</i>

<img src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/images/CryptoBotLogoBot.png" data-canonical-src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/images/CryptoBotLogoBot.png" width="340" height="340" />

<details>
<summary>Instructions</summary>
<blockquote>

1. [![Run on Repl.it](https://repl.it/badge/github/Persomatey/CryptoAlertBot)](https://repl.it/github/Persomatey/CryptoAlertBot) (or IDE of your choice) 
2. Set up a JSON file with [jsonbin.io](https://jsonbin.io/) 
	- Set initial value to `{"alerts":[]}`
	- Click `PRIVATE BIN` to untoggle (we want it to be public)
	- Click `CREATE` button 
	- Copy the Access URL 
3. In config.json do the following: 
	- Type the character you want to be the prefix of every command in the `prefix` variable 
	- Paste the bot's token into the quotation marks of the `token` variable 
	- Paste the JSON's Access URL into the quotation marks of the `json` variable 
	- Navigate go to [https://jsonbin.io/api-keys](https://jsonbin.io/api-keys) and copy the X-Master-Key  
	- Paste the X-Master-Key into the quotation marks of the `key` variable 
4. Run the replit app (or run app in IDE of choice) 
	- (Optional) For 24/7 pinging at 5 minute intervals, check out [UptimeRobot](https://uptimerobot.com/) 
5. Set some alerts! 

</blockquote>
</details>

<details>
<summary>Credits</summary> 
<blockquote>
 
- Programmed by [Hunter Goodin](https://huntergoodin.com/) 

</blockquote>
</details>

<details>
<summary>Miscellaneous</summary>
<blockquote>

- A good online IDE to run this code on is [Replit](https://replit.com/) 
  - Alternatively can also be run via any IDE such as [Visual Studio](https://visualstudio.microsoft.com/downloads/), [VS Code](https://code.visualstudio.com/insiders/), [Atom](https://atom.io/), etc 
- A good 24/7 pinger with 5 minute pings is [UptimeRobot](https://uptimerobot.com/) 

<details>
<summary>Some fun alternate logos I came up with. Feel free to use for your bot if you want. </summary> 
<blockquote>

- Included .psd file in this repo in case you want to make your own. 
- Original
	- <img src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/images/CryptoBotLogo.png" data-canonical-src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/CryptoBotLogo_Matrix.png" width="100" height="100"/>
- Matrix
	- <img src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/images/CryptoBotLogo_Matrix.png" data-canonical-src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/CryptoBotLogo_Matrix.png" width="100" height="100"/>
- Pride 
	- <img src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/images/CryptoBotLogo_Pride.png" data-canonical-src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/CryptoBotLogo_Pride.png" width="100" height="100"/>
- X.A.N.A.   
	- <img src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/images/CryptoBotLogo_Xana.png" data-canonical-src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/CryptoBotLogo_Xana.png" width="100" height="100"/>

</blockquote>
</details>

</blockquote>
</details>

<details>
<summary>Change List</summary>
<blockquote>

<details>
<summary>CL-000004</summary>
<blockquote>

- Made the following changes: 
	- Fixed bug where if you put an invalid amount in the 'setalert' command, it'll say that it's not a valid amount in USD 
		- Because the user might not always want to use USD 
		- Now, it'll just say "not a valid amount. --" 
	- Changed the activity message to include whatever the prefix the user has set in config 
		- Instead of just '!' like it was before 
	- Made it so that instead of .txt documents, it now reads and writes from a public json file using jsonbin.io 
	- Changed the help command embed: 
		- It now displays the prefix set in the config 
		- Fixed how the setalert command just said alert 
		- Rearranged some of the information so that the examples are right under the arguments usage 
		- Added a section for aliases 
	- Added an alias for the check command 
		- value 
	- Added aliases for the help command 
		- helpme 
		- commands 
	- Edited the README to reflect the above changes 

</blockquote>
</details>

<details>
<summary>CL-000003</summary>
<blockquote>

- Made the following changes: 
	- Fixed bug where it wouldn't delete the alert if it used the "below" operator 
	- Removed title from !help message 
	- Added bold 'headers' on top of the list of commands and the usage in !help message 
	- Rewrote the system to where it now stores the alert data in a .txt document instead of just in memory 
	- Made it to where it now checks every 3 seconds. 
		- However, alerts that are deleted automatically take up to 3 seconds to actually delete 
	- Edited the README to reflect the above changes 

</blockquote>
</details>

<details>
<summary>CL-000002</summary>
<blockquote>

- Made the following changes: 
	- Fixed bug in !setalert command where it displays $ next to amount 
		- That doesn't make sense if we're talking about a non-dollar like BTC for example 
	- Edited the README to reflect the above changes 

</blockquote>
</details>

<details>
<summary>CL-000001</summary>
<blockquote>

- Made the following changes: 
	- Fixed how the !help command displays the !setalert command as !alert 
		- It used to be just !alert but I changed it to !setalert and forgot to change this 
	- Added .replit file 
	- Added keep_alive.js reference in index 
	- Added logo for this bot including .psd file in case people want to mess around with it 
	- Edited the README to reflect the above changes 

</blockquote>
</details>

<details>
<summary>CL-000000</summary>
<blockquote>

Initial upload 

</blockquote>
</details>

</blockquote>
</details>

<details>
<summary>Support</summary> 
<blockquote>

Your support is completely optional. 

However, if you want to buy me a cup of coffee (or a new house), you can do so by sending Bitcoin to this address: 
- 3BXqPxqXkKxFib4TSQychhuEi6euSspCK2 
- <img src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/BTCAddressQRCode.png" data-canonical-src="https://raw.githubusercontent.com/Persomatey/CryptoAlertBot/master/BTCAddressQRCode.png" width="200" height="200" />

</blockquote>
</details>
