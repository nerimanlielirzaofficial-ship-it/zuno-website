import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
const src=path.resolve('../../assets/emojis'), out=path.resolve('../../assets/emojis/png');
await fs.mkdir(out,{recursive:true});
for (const name of await fs.readdir(src)) {
  if (!name.endsWith('.svg')) continue;
  const base=name.replace('.svg','');
  await sharp(path.join(src,name)).resize(128,128).png().toFile(path.join(out,base+'.png'));
}
console.log('ZUNO özel ikonları PNG olarak hazırlandı.');
