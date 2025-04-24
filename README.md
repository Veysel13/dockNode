# SequalizeImport

SequalizeImport, modern mikroservis mimarisi ile uyumlu, modüler ve ölçeklenebilir bir Node.js başlangıç projesidir. Proje, geliştiricilere sağlam bir altyapı sunarak API, mesajlaşma, görev yönetimi ve hata kontrolü gibi birçok yapıyı tek bir sistemde birleştirir.

## Özellikler

- **Node.js & Express** – Hızlı ve esnek HTTP sunucu yapısı
- **Sequelize ORM** – PostgreSQL veritabanı yönetimi
- **GraphQL** – Tip güvenliği sağlayan esnek API sorgulama dili
- **RabbitMQ** – Servisler arası mesajlaşma ve kuyruk yönetimi
- **Queue Jobs** – Asenkron arka plan görevleri
- **Cache System** – Redis, Memory, File gibi çoklu cache driver desteği
- **Cron Jobs** – Zamanlanmış görev çalıştırma sistemi
- **Event Emitter** – Uygulama içi event tabanlı iletişim yapısı
- **Error Handling** – Merkezi hata yakalama ve yönetim sistemi
- **Docker** – Ortam bağımsız geliştirme ve dağıtım desteği

## Kurulum

### 1. Projeyi Klonla
```bash
git clone https://github.com/Veysel13/sequalizeImport.git
cd sequalizeImport

2. Ortam Değişkenlerini Ayarla

.env dosyasını oluştur ve ihtiyaç duyulan değişkenleri ayarla:

3. Docker ile Başlat
docker-compose up --build

Kullanım Alanları
	•	Event tabanlı sistemler
	•	Queue/Job yönetimi gerektiren projeler
	•	GraphQL API geliştirme
	•	Arka plan görevleri (cron, kuyruk)
	•	Cache yönetimi

Katkı Sağlamak

Katkılarınızı memnuniyetle karşılıyoruz! Forklayın, geliştirin ve pull request gönderin.
