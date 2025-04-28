# 💬 Forum Platformu

Bu proje, **Node.js** ve **MongoDB** kullanılarak geliştirilmiş basit bir forum uygulamasıdır.  
Kullanıcılar konu açabilir, yorum yapabilir, admin paneli üzerinden yönetim sağlayabilirsiniz.

---

## 🚀 Özellikler

- Kullanıcı kaydı ve girişi (JWT ile güvenli oturum)  
- Konu oluşturma, yorum yapma  
- Konu ve yorum raporlama  
- Admin paneli (kullanıcı ve içerik yönetimi)  
- Dark tema (şık bir arayüz)

---

## ⚙️ Kurulum

1. **Projeyi klonla:**

```bash
git clone https://github.com/kullaniciadi/forum-platformu.git
cd forum-platformu
```

2. **Gerekli paketleri kur:**

```bash
npm install
```

3. **MongoDB'yi kur ve başlat:**

- Eğer **local MongoDB** kullanacaksan:
  - [MongoDB Kurulum Rehberi](https://www.mongodb.com/docs/manual/installation/)
  - Local'de çalıştır:  
    ```bash
    mongod
    ```

- **MongoDB Atlas** kullanacaksan:  
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) üzerinden bir hesap aç.  
  - Bir **veritabanı oluştur**, **connection string** al.

4. **Ortam değişkenlerini ayarla:**

- Proje kök dizininde bir `.env` dosyası oluştur:

```env
MONGO_URI=mongodb://localhost:27017/forumdb
JWT_SECRET=KENDİ JWT KEYİNİ GİR
PORT=3000
```

> **Not:** Eğer **MongoDB Atlas** kullanıyorsan, `MONGO_URI` kısmına Atlas bağlantı stringini yapıştır.

5. **Projeyi başlat:**

```bash
npm start
```

---

## 🌐 Kullanım

- Uygulama tarayıcıdan:  
  ```
  http://localhost:3000
  ```
- Kayıt ol, giriş yap, konulara bak, yorum yap.

---

## 🛡️ Admin Panel

- Admin girişi yaptıktan sonra,  
  ```
  http://localhost:3000/admin
  ```
- Konuları, yorumları, kullanıcıları yönetebilirsin.

---

## 🧑‍💻 Geliştirici Notları

- **Node.js** + **Express.js** backend  
- **MongoDB** veritabanı  
- JWT ile kimlik doğrulama  
- Basit, işlevsel bir forum sistemi
