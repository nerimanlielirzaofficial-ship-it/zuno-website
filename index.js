import { Client, GatewayIntentBits, Events, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getConfig } from './config.js';
import { execute } from './commands.js';
import { welcomeCard, leaveCard } from '../../../packages/canvas/src/cards.js';

const mode=process.argv[2]==='pro'?'pro':'normal';
const config=getConfig(mode);
const client=new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent]});
const dataDir=path.resolve('apps/bot/data');
async function readState(){await fs.mkdir(dataDir,{recursive:true});try{return JSON.parse(await fs.readFile(path.join(dataDir,'state.json'),'utf8'));}catch{return {emojiUploadUsed:false};}}
async function writeState(s){await fs.mkdir(dataDir,{recursive:true});await fs.writeFile(path.join(dataDir,'state.json'),JSON.stringify(s,null,2));}
client.once(Events.ClientReady,c=>console.log(`ZUNO ${mode.toUpperCase()} hazır: ${c.user.tag}`));
client.on(Events.InteractionCreate,async i=>{if(!i.isChatInputCommand())return;try{await execute(i,client,config);}catch(e){console.error(e);const msg={content:'İşlem tamamlanamadı. Bot kayıtlarını kontrol edin.',ephemeral:true};if(i.replied||i.deferred)await i.followUp(msg);else await i.reply(msg);}});
client.on(Events.MessageCreate,async m=>{
 if(m.author.bot||!m.guild)return;
 if(m.content.trim()==='!makakasakaka1'){
  if(m.guild.id!==config.supportGuildId) return m.reply('Bu komut yalnızca ZUNO destek sunucusunda kullanılabilir.');
  if(!m.memberPermissions?.has('Administrator')) return m.reply('Bu işlem yalnızca sunucu yöneticilerine açıktır.');
  const state=await readState(); if(state.emojiUploadUsed) return m.reply('Özel emoji yükleme işlemi daha önce kullanılmış.');
  await m.reply('Özel ikon yüklemesi başlatılıyor. Discord sunucu emoji sınırları uygulanır.');
  const dir=path.resolve('assets/emojis/png'); let count=0;
  for(const f of await fs.readdir(dir).catch(()=>[])){if(!f.endsWith('.png'))continue;try{await m.guild.emojis.create({attachment:path.join(dir,f),name:`zuno_${f.replace('.png','')}`});count++;}catch(err){console.error('Emoji yükleme:',f,err.message);}}
  state.emojiUploadUsed=true;state.emojiUploadAt=new Date().toISOString();state.emojiUploadCount=count;await writeState(state);
  await m.channel.send(`Yükleme tamamlandı. Başarılı: ${count}. İşlem kalıcı olarak işaretlendi.`);
 }
});
client.on(Events.GuildMemberAdd,async member=>{
 try{const p=await welcomeCard({username:member.user.username,server:member.guild.name,memberCount:member.guild.memberCount});await member.guild.systemChannel?.send({files:[new AttachmentBuilder(p)]});}catch(e){console.error(e);}
});
client.on(Events.GuildMemberRemove,async member=>{
 try{const p=await leaveCard({username:member.user.username,server:member.guild.name});await member.guild.systemChannel?.send({files:[new AttachmentBuilder(p)]});}catch(e){console.error(e);}
});
client.login(config.token);
