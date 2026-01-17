# 🏗️ ARCH-BUILDER v1.1 [TUI-READY]

**ARCH-BUILDER**, Arch Linux kurulum sürecini otomatize eden ve modern bir TUI (Terminal User Interface) estetiğiyle sunan gelişmiş bir script oluşturma platformudur. İster manuel seçimlerle kendi scriptinizi oluşturun, ister Yapay Zeka (AI) yardımıyla hayalinizdeki sistemi sadece birkaç kelimeyle tarif edin.

![ARCH-BUILDER Banner](https://img.shields.io/badge/Status-Stable-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.1-orange?style=for-the-badge)

---

## 🚀 Temel Özellikler

### 1. �️ Off-line Mod (Manuel Yapılandırma)
Adım adım, hata payını minimize eden sihirbaz aracılığıyla sisteminizi yapılandırın:
- **Disk Bölümleme:** En büyük diski otomatik algılama veya manuel seçim.
- **Dosya Sistemleri:** EXT4 (Stabil), BTRFS (Gelişmiş), XFS (Performans).
- **Kernel Seçimi:** Stable, LTS veya ZEN çekirdekleri.
- **Arayüz (DE/WM):** GNOME, KDE Plasma, Cinnamon, XFCE4 ve favorimiz **Hyprland WM**.
- **GPU Sürücüleri:** NVIDIA (Proprietary/LTS) veya Open Source Mesa (AMD/Intel).

### 2. � AI-Assisted Mod (Gemini/GPT/Claude Integration)
Karmaşık kurulumları yapay zekaya devredin. Sadece ihtiyacınızı yazın, o size tam teşekküllü bir `.sh` dosyası hazırlasın:
- **Çoklu Model Desteği:** 
  - **Google Gemini:** Pro/Flash (Otomatik fallback mekanizmalı).
  - **OpenAI:** ChatGPT-4o Entegrasyonu.
  - **Anthropic:** Claude 3.5 Sonnet Desteği.
- **Akıllı Analiz:** Donanımınıza ve kullanım amacınıza göre en uygun paketleri otomatik belirler.
- **Kendi Anahtarını Kullan:** İsterseniz sunucudaki varsayılan anahtarı, isterseniz kendi API anahtarınızı kullanarak işlem yapabilirsiniz.

### 3. 🛡️ Güvenlik ve Doğrulama
- Üretilen tüm scriptler `#!/bin/bash` ve `set -e` kurallarına uygun, temiz ve yorum satırlarıyla açıklanmış şekilde sunulur.
- Kritik sistem uyarıları kullanıcıya son aşamada tekrar hatırlatılır.

---

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- **Node.js** (v18+)
- **NPM**
- Bir AI Provider API Key (Opsiyonel, yerel kullanım için)

### Adımlar

1. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/the91455/arch-builder.git
   cd arch-builder
   ```

2. **Backend Hazırlığı:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # .env dosyasını açıp API anahtarlarınızı ekleyin
   node server.js
   ```

3. **Frontend Başlatma:**
   - Frontend saf HTML/JS/CSS olduğu için `frontend/index.html` dosyasını tarayıcıda açmanız yeterlidir. (Veya `live-server` gibi bir araç kullanabilirsiniz).

---

## � Proje Yapısı

```text
arch-builder/
├── backend/                # Express.js Server
│   ├── routes/             # API Router (AI Generation Logic)
│   ├── server.js           # Ana sunucu dosyası
│   └── .env                # Hassas veriler (Git ignore edildi!)
├── frontend/               # UI Katmanı
│   ├── js/                 # Dinamik TUI mantığı (Wizard, AI Mode)
│   ├── styles/             # Retro Terminal CSS teması
│   └── index.html          # Ana giriş noktası
└── .gitignore              # Gereksiz dosyaların filtrelenmesi
```

---

## ⚠️ Önemli Uyarı
Bu araç tarafından üretilen scriptler sisteminizdeki verileri silebilir. **Çalıştırmadan önce her zaman script içeriğini kontrol edin ve verilerinizi yedekleyin.**

---

## 🤝 Katkıda Bulunma
Her türlü Pull Request ve öneriye açığız. Eğer bir hata bulursanız lütfen Issue açmaktan çekinmeyin.

**Developed with ❤️ for Arch Linux Users.**
