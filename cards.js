import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas';
import { theme as t } from './theme.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('generated');
const roundRect = (ctx,x,y,w,h,r) => { ctx.beginPath(); ctx.roundRect(x,y,w,h,r); };
async function base(title, subtitle, width=1000, height=360) {
  const c=createCanvas(width,height), x=c.getContext('2d');
  const g=x.createLinearGradient(0,0,width,height); g.addColorStop(0,t.background); g.addColorStop(1,'#1C2C3A');
  x.fillStyle=g; x.fillRect(0,0,width,height);
  x.fillStyle=t.accent; x.fillRect(0,0,7,height);
  roundRect(x,34,34,width-68,height-68,24); x.fillStyle=t.surface+'D9'; x.fill();
  x.fillStyle=t.text; x.font='bold 38px sans-serif'; x.fillText(title,66,104);
  x.fillStyle=t.muted; x.font='22px sans-serif'; x.fillText(subtitle,66,145);
  x.fillStyle=t.accent; x.fillRect(66,170,110,4);
  x.fillStyle=t.muted; x.font='18px sans-serif'; x.fillText('ZUNO • SUNUCU YÖNETİM SİSTEMİ',66,height-62);
  return {canvas:c,ctx:x};
}
async function save(name,c){ await fs.mkdir(OUT,{recursive:true}); const p=path.join(OUT,name+'.png'); await fs.writeFile(p,c.toBuffer('image/png')); return p; }

export async function welcomeCard({username='Yeni Üye',server='ZUNO Sunucusu',memberCount=0}={}) {
 const {canvas:c,ctx:x}=await base('HOŞ GELDİN',server);
 x.fillStyle=t.text; x.font='bold 48px sans-serif'; x.fillText(username,66,245);
 x.fillStyle=t.muted; x.font='24px sans-serif'; x.fillText(`${memberCount} • sunucu üyesi`,66,290);
 return save('welcome',c);
}
export async function leaveCard({username='Üye',server='ZUNO Sunucusu'}={}) {
 const {canvas:c,ctx:x}=await base('GÖRÜŞMEK ÜZERE',server);
 x.fillStyle=t.text; x.font='bold 46px sans-serif'; x.fillText(username,66,250);
 x.fillStyle=t.muted; x.font='23px sans-serif'; x.fillText('Sunucudan ayrıldı.',66,294);
 return save('leave',c);
}
export async function profileCard({username='ZUNO Üyesi',level=1,xp=0,nextXp=100}={}) {
 const {canvas:c,ctx:x}=await base('ÜYE PROFİLİ','Seviye ve ilerleme kartı',1000,420);
 x.fillStyle=t.text; x.font='bold 42px sans-serif'; x.fillText(username,66,235);
 x.fillStyle=t.accent; x.font='bold 28px sans-serif'; x.fillText(`SEVİYE ${level}`,66,285);
 roundRect(x,66,315,850,24,12); x.fillStyle=t.surface2; x.fill();
 roundRect(x,66,315,850*Math.min(1,xp/Math.max(1,nextXp)),24,12); x.fillStyle=t.accent; x.fill();
 x.fillStyle=t.muted; x.font='18px sans-serif'; x.fillText(`${xp} / ${nextXp} XP`,66,375);
 return save('profile',c);
}
export async function ticketPanel({title='DESTEK MERKEZİ',description='Destek talebi oluşturmak için aşağıdaki düğmeyi kullan.'}={}) {
 const {canvas:c,ctx:x}=await base(title,description,1000,390);
 x.fillStyle=t.text; x.font='bold 30px sans-serif'; x.fillText('TALEP OLUŞTUR',66,245);
 x.fillStyle=t.accent; roundRect(x,66,270,260,58,14); x.fill();
 x.fillStyle='#10202A'; x.font='bold 20px sans-serif'; x.fillText('DESTEK TALEBİ AÇ',91,307);
 return save('ticket-panel',c);
}
export async function moderationCard({action='İşlem',target='Kullanıcı',moderator='Yetkili',reason='Belirtilmedi'}={}) {
 const {canvas:c,ctx:x}=await base('MODERASYON KAYDI','Sunucu işlem özeti',1000,420);
 const rows=[['İŞLEM',action],['HEDEF',target],['YETKİLİ',moderator],['SEBEP',reason]];
 rows.forEach((r,i)=>{const y=215+i*48;x.fillStyle=t.muted;x.font='bold 17px sans-serif';x.fillText(r[0],66,y);x.fillStyle=t.text;x.font='22px sans-serif';x.fillText(String(r[1]).slice(0,60),230,y);});
 return save('moderation',c);
}
export async function statsCard({members=0,channels=0,roles=0}={}) {
 const {canvas:c,ctx:x}=await base('SUNUCU İSTATİSTİKLERİ','Anlık sunucu özeti',1000,390);
 [['ÜYE',members],['KANAL',channels],['ROL',roles]].forEach((r,i)=>{const xx=66+i*290;roundRect(x,xx,205,230,110,18);x.fillStyle=t.surface2;x.fill();x.fillStyle=t.muted;x.font='bold 18px sans-serif';x.fillText(r[0],xx+22,245);x.fillStyle=t.text;x.font='bold 42px sans-serif';x.fillText(String(r[1]),xx+22,300);});
 return save('server-stats',c);
}
