const i18n = require('i18n')
import path from 'path';

i18n.configure({
  locales: ['en', 'tr'], // Kullanılacak diller
  defaultLocale: 'en',   // Varsayılan dil
  directory: path.join(__dirname, '../lang/i18n'), // Çeviri dosyalarının konumu
  objectNotation: true, // Nesne notasyonu için (örn. common.welcome)
  autoReload: true,     // Değişikliklerde otomatik yeniden yükleme
  updateFiles: false,   // Çeviri dosyalarını otomatik güncelleme
  cookiename: 'locale'
});

// res.__('errors.email_exist', { name: 'Ahmet' })

export default i18n;