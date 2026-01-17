# ❓ Sıkça Sorulan Sorular (FAQ)

ARCH-BUILDER hakkında merak edilenler ve karşılaşılabilecek olası sorunlar.

---

### 1. 🔑 API Key vermezsem ne olur?
Eğer TUI üzerinden bir API key girmezseniz, sistem `backend/.env` dosyasındaki varsayılan anahtarı kullanmaya çalışır. Eğer o da yoksa, AI ile script üretimi hata verecektir. Manuel yapılandırma modu (Off-line) her zaman çalışmaya devam eder.

### 2. 🛡️ Üretilen scriptler güvenli mi?
AI tarafından üretilen scriptler genel en iyi uygulamaları takip etse de, **çalıştırmadan önce her zaman içeriğini kontrol etmelisiniz.** Scriptler disk formatlama gibi geri dönüşü olmayan işlemler yapabilir.

### 3. 🐢 AI script üretimi neden bazen yavaş?
Google Gemini, OpenAI ve Anthropic API'leri yoğunluğa bağlı olarak 10-20 saniye sürebilir. Backend'de kurduğumuz **fallback (yedekleme)** sistemi sayesinde, bir model yavaşsa veya hata verirse otomatik olarak diğer modeller denenir.

### 4. 🌐 İnternet olmadan çalışır mı?
- **Off-line Mod:** Script üretmek için internet gerekmez. Ancak üretilen scriptleri real bir Arch Linux kurulumunda çalıştırmak için doğal olarak internet gerekecektir.
- **AI Mode:** API çağrıları için backend'in internete erişimi olması şarttır.

### 5. 🐧 Neden Hyprland veya farklı WM'ler seçilince script daha karmaşık?
Window Manager (WM) kurulumları genellikle manuel konfigürasyon dosyaları (dotfiles) gerektirir. AI modumuz, bu süreci sizin için otomatikleştirerek gerekli tüm bağımlılıkları ve temel ayarları script'e dahil eder.

---

> [!TIP]
> Başka bir sorunuz varsa veya bir hata bulduysanız lütfen bir **Issue** açarak bize bildirin!
