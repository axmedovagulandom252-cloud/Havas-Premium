import os
import uuid
from datetime import datetime

from flask import Flask, request, jsonify, send_from_directory
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder=".", static_url_path="")

BOT_TOKEN = os.getenv("BOT_TOKEN", "")
CHAT_ID = os.getenv("CHAT_ID", "")
PORT = int(os.getenv("PORT", "5000"))

# Bronlar server xotirasida saqlanadi
bookings = {}


def send_telegram(text, buttons):
    if not BOT_TOKEN or not CHAT_ID:
        raise RuntimeError("BOT_TOKEN yoki CHAT_ID sozlanmagan")

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    payload = {
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "reply_markup": {
            "inline_keyboard": buttons
        }
    }

    r = requests.post(url, json=payload, timeout=15)
    r.raise_for_status()

    return r.json()


@app.get("/")
def home():
    return send_from_directory(".", "index.html")


@app.post("/api/booking")
def booking():
    d = request.get_json(silent=True) or {}

    required = [
        "name",
        "phone",
        "date",
        "time",
        "guests",
        "event_type",
        "hall"
    ]

    if any(not str(d.get(k, "")).strip() for k in required):
        return jsonify({
            "message": "Majburiy maydonlar to'ldirilmagan"
        }), 400

    booking_id = str(uuid.uuid4())[:8].upper()

    bookings[booking_id] = {
        "status": "pending",
        "created_at": datetime.now().strftime("%d.%m.%Y %H:%M"),
        "data": d
    }

    text = (
        "🔔 <b>YANGI BRON SO'ROVI</b>\n\n"
        f"👤 <b>Ism:</b> {d['name']}\n"
        f"📞 <b>Telefon:</b> {d['phone']}\n"
        f"📅 <b>Sana:</b> {d['date']}\n"
        f"🕐 <b>Vaqt:</b> {d['time']}\n"
        f"🎉 <b>Tadbir:</b> {d['event_type']}\n"
        f"👥 <b>Mehmonlar:</b> {d['guests']}\n"
        f"🏛 <b>Zal:</b> {d['hall']}\n"
        f"📝 <b>Izoh:</b> {d.get('message') or '—'}\n\n"
        f"🕓 <b>Qabul qilingan:</b> "
        f"{datetime.now().strftime('%d.%m.%Y %H:%M')}"
    )

    buttons = [[
        {
            "text": "✅ Tasdiqlash",
            "callback_data": f"approve:{booking_id}"
        },
        {
            "text": "❌ Rad etish",
            "callback_data": f"reject:{booking_id}"
        }
    ]]

    try:
        send_telegram(text, buttons)
    except Exception as e:
        bookings.pop(booking_id, None)

        return jsonify({
            "message": str(e)
        }), 500

    return jsonify({
        "ok": True,
        "booking_id": booking_id,
        "status": "pending"
    })


# Sayt shu endpoint orqali bron holatini tekshiradi
@app.get("/api/booking/<booking_id>/status")
def booking_status(booking_id):

    booking = bookings.get(booking_id)

    if not booking:
        return jsonify({
            "status": "not_found"
        }), 404

    return jsonify({
        "status": booking["status"]
    })


# Telegram tugmalari
@app.post("/telegram/webhook")
def telegram_webhook():

    update = request.get_json(silent=True) or {}

    cq = update.get("callback_query")

    if not cq:
        return jsonify({"ok": True})

    action = cq.get("data", "")

    if ":" not in action:
        return jsonify({"ok": True})

    command, booking_id = action.split(":", 1)

    if booking_id not in bookings:
        answer = "Bron topilmadi ❗"

    elif command == "approve":
        bookings[booking_id]["status"] = "approved"
        answer = "Bron tasdiqlandi ✅"

    elif command == "reject":
        bookings[booking_id]["status"] = "rejected"
        answer = "Bron rad etildi ❌"

    else:
        answer = "Noma'lum amal"

    # Telegram tugmasiga javob
    requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/answerCallbackQuery",
        json={
            "callback_query_id": cq["id"],
            "text": answer
        },
        timeout=10
    )

    # Telegramda ham statusni ko'rsatish
    try:
        requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json={
                "chat_id": cq["message"]["chat"]["id"],
                "text": answer
            },
            timeout=10
        )
    except Exception:
        pass

    return jsonify({"ok": True})


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=PORT,
        debug=True
    )