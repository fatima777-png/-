require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: "fatimad@uaeu.ac.ae", pass: "your-secure-password" }
});

app.post('/api/book', (req, res) => {
    const { name, phone, email, purpose, date, time } = req.body;

    transporter.sendMail({
        from: "fatimad@uaeu.ac.ae",
        to: "fatimad@uaeu.ac.ae",
        subject: "طلب حجز جديد",
        text: `المستفيد: ${name}\n📅 التاريخ: ${date}\n⏰ الوقت: ${time}\n📞 الهاتف: ${phone}\n📧 البريد: ${email}\n📌 الغرض: ${purpose}`
    });

    res.json({ message: "تم إرسال طلب الحجز بنجاح!" });
});

app.listen(3000, () => console.log("الخادم يعمل على المنفذ 3000"));
