import helmet from 'helmet';

export const securityHeaders = helmet();


/*
Middleware	Açıklama
helmet.contentSecurityPolicy()	Tarayıcıya hangi kaynaklara (CSS, JS, img vs.) izin verildiğini bildirir. XSS saldırılarını azaltır.
helmet.xssFilter() (artık varsayılan değil)	Tarayıcıda basit XSS koruması sağlar (eski tarayıcılar içindir).
helmet.hidePoweredBy()	X-Powered-By: Express header'ını kaldırır. Express kullanıldığını gizler.
helmet.frameguard()	Clickjacking saldırılarına karşı iframe içine gömülmeyi engeller.
helmet.noSniff()	Tarayıcının MIME türünü "tahmin etmesini" engeller.
helmet.hsts()	Tarayıcının sadece HTTPS kullanmasını zorunlu kılar.
helmet.permittedCrossDomainPolicies()	Adobe Flash ve Acrobat’ın domain politikalarını sınırlar.
helmet.referrerPolicy()	Referrer header’ını nasıl göndereceğini belirler.
helmet.crossOriginResourcePolicy()	Diğer origin'lerden gelen kaynaklara nasıl davranacağını kontrol eder.
*/
