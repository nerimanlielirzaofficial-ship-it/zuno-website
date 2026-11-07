import 'dotenv/config';
export function getConfig(mode) {
 const pro=mode==='pro';
 const token=process.env[pro?'DISCORD_TOKEN_PRO':'DISCORD_TOKEN_NORMAL'];
 const clientId=process.env[pro?'DISCORD_CLIENT_ID_PRO':'DISCORD_CLIENT_ID_NORMAL'];
 if(!token || !clientId) throw new Error(`${mode.toUpperCase()} bot için token ve client ID .env dosyasında eksik.`);
 return {mode,token,clientId,guildId:process.env.DISCORD_GUILD_ID, supportGuildId:process.env.ZUNO_SUPPORT_GUILD_ID,logChannelId:process.env.LOG_CHANNEL_ID};
}
