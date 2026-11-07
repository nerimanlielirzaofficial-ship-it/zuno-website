import { REST, Routes } from 'discord.js';
import { commands } from './commands.js';
import { getConfig } from './config.js';
for (const mode of ['normal','pro']) {
 const c=getConfig(mode), rest=new REST({version:'10'}).setToken(c.token);
 await rest.put(Routes.applicationCommands(c.clientId),{body:commands});
 console.log(`${mode.toUpperCase()} slash komutları kaydedildi.`);
}
