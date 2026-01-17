# 🏗️ ARCH-BUILDER v1.1 [TUI-READY]

**ARCH-BUILDER**, Arch Linux kurulum sürecini otomatize eden ve modern bir TUI estetiğiyle sunan gelişmiş bir script oluşturma platformudur.

## 📸 Arayüz Görüntüleri

### Ana Menü

![Ana Menü](docs/assets/main_menu_1768676866502.png)

### Diğer Ekranlar

| Manuel Yapılandırma (Başlangıç) | Manuel Yapılandırma (Seçimli) |
| :---: | :---: |
| ![Offline Wizard](docs/assets/offline_wizard_1768676882577.png) | ![Configured Wizard](docs/assets/offline_wizard_interaction_1768677027876.png) |

| AI Modu | Yapılandırılmış Sihirbaz |
| :---: | :---: |
| ![AI Modu](docs/assets/ai_interface_1768676945679.png) | ![Yapılandırılmış](docs/assets/configured_wizard_1768677009058.png) |

### 🎨 Örnek: ARCH-BUILDER ile Kurulmuş Sistem

![Hyprland Desktop](https://raw.githubusercontent.com/sumithemmadi/hyprland-dotfiles/main/pics/screenshot_one.png)
*ARCH-BUILDER kullanılarak kurulmuş Hyprland masaüstü (Örnek Rice)*

---

## ⚡ Hızlı Başlangıç

1.  **Backend'i Hazırlayın:**
    ```bash
    cd backend && npm install
    cp .env.example .env # API anahtarlarınızı ekleyin
    node server.js
    ```
2.  **Frontend'i Açın:** `frontend/index.html` dosyasını tarayıcınızda açın.

---

## 📚 Detaylı Dökümantasyon

Proje dökümantasyonu `docs/` klasörü altına taşınmıştır:

-   📄 **[Kullanım Kılavuzu & Özellikler](docs/README.md)**: Projenin tüm özelliklerini ve temel kurulum adımlarını içerir.
-   🏗️ **[Teknik Mimari (Architecture)](docs/ARCHITECTURE.md)**: AI çalışma mantığı, fallback mekanizmaları ve proje yapısı detayları.
-   ❓ **[Sıkça Sorulan Sorular (FAQ)](docs/FAQ.md)**: Genel sorular ve yanıtları.

---

## ⚠️ Uyarı
Üretilen scriptler sisteminizi formatlayabilir. Çalıştırmadan önce içeriği kontrol etmeyi unutmayın.

**Developed with ❤️ for Arch Linux Users.**
