# ZUNO Platform

ZUNO Normal ve ZUNO Pro aynı kod tabanını kullanır; ayrı Discord uygulama tokenlarıyla ayrı süreçler olarak çalışır.

## Android üzerinden kurulum
1. ZIP'i GitHub deposuna yükle veya dosyaları mevcut depoya çıkar.
2. Node.js 20+ destekleyen bir sunucuda `npm install` çalıştır.
3. `apps/bot/.env.example` dosyasını `.env` olarak kopyala ve değerleri doldur.
4. `npm run register` ile slash komutlarını kaydet.
5. `npm run assets:build` ile SVG ikonları PNG yap.
6. Discord Developer Portal üzerinden Message Content Intent ve Server Members Intent izinlerini aç. Botlara ilgili sunucuda emoji yönetme, kanal yönetme ve moderasyon izinlerini ver.
7. `npm run bot:normal` ve `npm run bot:pro` komutlarını ayrı servislerde çalıştır.

Bot tokenlarını, Discord Client Secret değerini veya API anahtarlarını GitHub'a yükleme.

## Klasörler
- `assets/emojis/`: Her özel ikon ayrı SVG.
- `packages/canvas/`: Canvas kartları ve PNG üretimi.
- `apps/bot/`: Ortak Discord bot altyapısı ve komutlar.

Bu ilk çalışan altyapı sürümüdür. Tam 100+ komut kataloğu, web API bağlantısı, veritabanı ve tüm Canvas şablonları sonraki geliştirme aşamalarında tamamlanacaktır.
