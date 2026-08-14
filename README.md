# HAVAS PREMIUM — SAYT + TELEGRAM BOT

Bitta loyihada:
- Premium responsive sayt
- Bron formasi
- Tadbir sanasi
- Ertalab/Kechqurun
- Tadbir turi: To'y, Nikoh, Tug'ilgan kun, Yubiley, Korporativ, Boshqa
- Mehmonlar soni
- Zal tanlash
- Qo'shimcha izoh
- Telegram botga avtomatik yuborish
- Telegram xabarida Tasdiqlash/Rad etish tugmalari

## 1. Telegram bot yaratish
Telegram'da @BotFather orqali bot yarating va BOT TOKEN oling.
Bot tokenni kod ichiga yozmang; environment variable sifatida bering.

## 2. CHAT_ID
Havas Premium egasining Telegram akkauntiga botni yozing, keyin o'sha chat ID ni backend konfiguratsiyasiga kiriting.
Guruhga yubormoqchi bo'lsangiz botni guruhga qo'shib, kerakli chat ID ni o'rnating.

## 3. Ishga tushirish
Python 3.10+:
  cd bot
  pip install -r requirements.txt
  set BOT_TOKEN=...
  set CHAT_ID=...
  python app.py

Linux/macOS:
  export BOT_TOKEN="..."
  export CHAT_ID="..."
  python app.py

Keyin brauzerda:
  http://localhost:5000

## 4. Production
Saytni internetga chiqarish uchun Python backend'ni HTTPS domen/serverga joylashtirish kerak.
Telegram webhook'ni production URL ga ulash kerak:
  https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://YOUR-DOMAIN/telegram/webhook

## Muhim
Hozirgi "Tasdiqlash/Rad etish" demo callback ishlaydi. Real bron tizimida har bir bron uchun alohida ID, ma'lumotlar bazasi, vaqt bandligini tekshirish va takroriy bronni bloklash qo'shilishi kerak.

BOT_TOKEN ni hech kimga yubormang.
