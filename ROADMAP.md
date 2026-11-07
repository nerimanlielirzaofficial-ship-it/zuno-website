# ZUNO geliştirme sırası

## Bu pakette
- 34 ayrı özel SVG ikon (PNG üretim betiği dahil)
- Canvas API ile hoş geldin, ayrılma, profil, ticket paneli, moderasyon ve istatistik kartları
- ZUNO Normal / Pro için ortak Discord.js bot altyapısı
- Ayrı token ve uygulama kimliği yapılandırması
- Temel slash komutları
- `/hk`, `/yardim`
- Destek sunucusuna özel `!makakasakaka1` tek kullanımlık yükleme akışı ve kalıcı yerel durum kaydı

## Sonraki modüller
- Kalıcı veritabanı (SQLite geliştirme, PostgreSQL üretim)
- 100+ tam işlevli komut
- Ticket butonları ve transcript
- Yetkili başvuru, seviye/ekonomi, müzik, çekiliş ve anket
- Ayrıntılı denetim kayıtları
- Components V2 arayüzleri
- Web OAuth2 ve panel API entegrasyonu
- Üretim ortamında kalıcı durum için veritabanı migrasyonu

Not: Emoji yükleme durumu bu başlangıç paketinde JSON dosyasında tutulur. Birden fazla bot süreci/hosting instance için veritabanına taşınmalıdır.
