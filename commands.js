import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
export const commands = [
 new SlashCommandBuilder().setName('ping').setDescription('Bot bağlantı gecikmesini gösterir.'),
 new SlashCommandBuilder().setName('yardim').setDescription('ZUNO komut yardım menüsünü açar.'),
 new SlashCommandBuilder().setName('hk').setDescription('Yetkili sunucular için güvenli temel kurulum yapar.'),
 new SlashCommandBuilder().setName('sunucu').setDescription('Sunucu bilgilerini gösterir.'),
 new SlashCommandBuilder().setName('istatistik').setDescription('Bot ve sunucu istatistiklerini gösterir.'),
 new SlashCommandBuilder().setName('profil').setDescription('Kendi profil ve seviye bilgini gösterir.'),
 new SlashCommandBuilder().setName('temizle').setDescription('Belirtilen sayıda mesajı siler.').addIntegerOption(o=>o.setName('adet').setDescription('1-100 arası mesaj sayısı').setMinValue(1).setMaxValue(100).setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
 new SlashCommandBuilder().setName('at').setDescription('Üyeyi sunucudan atar.').addUserOption(o=>o.setName('uye').setDescription('Atılacak üye').setRequired(true)).addStringOption(o=>o.setName('sebep').setDescription('İşlem sebebi')).setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
 new SlashCommandBuilder().setName('yasakla').setDescription('Üyeyi sunucudan yasaklar.').addUserOption(o=>o.setName('uye').setDescription('Yasaklanacak üye').setRequired(true)).addStringOption(o=>o.setName('sebep').setDescription('İşlem sebebi')).setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
 new SlashCommandBuilder().setName('kilitle').setDescription('Mevcut metin kanalını kilitler.').setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
 new SlashCommandBuilder().setName('kilit-ac').setDescription('Mevcut metin kanalının kilidini açar.').setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
 new SlashCommandBuilder().setName('ticket-panel').setDescription('Destek talebi paneli gönderir.').setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
 new SlashCommandBuilder().setName('duyuru').setDescription('Sunucuya duyuru gönderir.').addStringOption(o=>o.setName('metin').setDescription('Duyuru metni').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
].map(c=>c.toJSON());

export async function execute(interaction, client, config) {
 const n=interaction.commandName;
 if(n==='ping') return interaction.reply({content:`Gecikme: ${client.ws.ping} ms`,ephemeral:true});
 if(n==='yardim') {
  const e=new EmbedBuilder().setColor(0x55C7D9).setTitle('ZUNO • KOMUT MERKEZİ').setDescription('**Genel**\\n`/ping` `/yardim` `/sunucu` `/istatistik` `/profil`\\n\\n**Moderasyon**\\n`/temizle` `/at` `/yasakla` `/kilitle` `/kilit-ac`\\n\\n**Yönetim**\\n`/hk` `/ticket-panel` `/duyuru`').setFooter({text:`ZUNO ${config.mode.toUpperCase()}`});
  return interaction.reply({embeds:[e],ephemeral:true});
 }
 if(n==='sunucu') return interaction.reply({embeds:[new EmbedBuilder().setColor(0x55C7D9).setTitle(interaction.guild.name).addFields({name:'Üye',value:String(interaction.guild.memberCount),inline:true},{name:'Kanal',value:String(interaction.guild.channels.cache.size),inline:true},{name:'Rol',value:String(interaction.guild.roles.cache.size),inline:true})],ephemeral:true});
 if(n==='istatistik') return interaction.reply({content:`ZUNO ${config.mode.toUpperCase()} aktif. Sunucu: ${client.guilds.cache.size} • Gecikme: ${client.ws.ping} ms`,ephemeral:true});
 if(n==='profil') return interaction.reply({content:`Profil: ${interaction.user.username}\\nSeviye sistemi veri tabanı bağlantısı tamamlandığında etkinleştirilecek.`,ephemeral:true});
 if(n==='hk') {
  if(!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) return interaction.reply({content:'Bu işlem için Sunucuyu Yönet yetkisi gerekir.',ephemeral:true});
  const existing=interaction.guild.channels.cache.find(c=>c.name==='zuno-kayit');
  const channel=existing??await interaction.guild.channels.create({name:'zuno-kayit',reason:'ZUNO güvenli kurulum'});
  return interaction.reply({content:`Temel kurulum tamamlandı. Kayıt kanalı: ${channel}`,ephemeral:true});
 }
 if(n==='temizle') {
  const amount=interaction.options.getInteger('adet');
  const deleted=await interaction.channel.bulkDelete(amount,true);
  return interaction.reply({content:`${deleted.size} mesaj silindi.`,ephemeral:true});
 }
 if(n==='at') {
  const user=interaction.options.getUser('uye'), reason=interaction.options.getString('sebep')||'Sebep belirtilmedi';
  await interaction.guild.members.kick(user,{reason});
  return interaction.reply({content:`${user.tag} sunucudan atıldı. Sebep: ${reason}`,ephemeral:true});
 }
 if(n==='yasakla') {
  const user=interaction.options.getUser('uye'), reason=interaction.options.getString('sebep')||'Sebep belirtilmedi';
  await interaction.guild.members.ban(user,{reason});
  return interaction.reply({content:`${user.tag} sunucudan yasaklandı. Sebep: ${reason}`,ephemeral:true});
 }
 if(n==='kilitle'||n==='kilit-ac') {
  const locked=n==='kilitle';
  await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone,{SendMessages:!locked});
  return interaction.reply({content:locked?'Kanal kilitlendi.':'Kanal kilidi açıldı.',ephemeral:true});
 }
 if(n==='ticket-panel') return interaction.reply({embeds:[new EmbedBuilder().setColor(0x55C7D9).setTitle('ZUNO DESTEK MERKEZİ').setDescription('Destek talebi açmak için yetkili ekibe başvurun. Ticket buton sistemi sonraki modülde etkinleştirilecektir.')],ephemeral:false});
 if(n==='duyuru') return interaction.reply({embeds:[new EmbedBuilder().setColor(0x55C7D9).setTitle('SUNUCU DUYURUSU').setDescription(interaction.options.getString('metin')).setTimestamp()]});
}
