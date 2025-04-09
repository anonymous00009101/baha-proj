const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Инициализация Firebase Admin SDK
const serviceAccount = require('./apikeyfirebase.json'); // Укажите путь к вашему ключу
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Токен не предоставлен.');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Ошибка проверки токена:', error);
        res.status(403).send('Недействительный токен.');
    }
};

// API для получения истории пользователя
app.get('/getUserHistory', async (req, res) => {
    try {
        const snapshot = await db.collection('userHistory').get();
        const history = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(history);
    } catch (error) {
        console.error('Ошибка при получении истории:', error);
        res.status(500).send('Ошибка при получении истории.');
    }
});

// API для добавления записи в историю
app.post('/addUserHistory', async (req, res) => {
    try {
        const { transcript, advice } = req.body;
        const docRef = await db.collection('userHistory').add({
            transcript,
            advice,
            timestamp: new Date(),
        });
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        console.error('Ошибка при добавлении записи:', error);
        res.status(500).send('Ошибка при добавлении записи.');
    }
});

// API для удаления записи из истории
app.delete('/deleteUserHistory', async (req, res) => {
    try {
        const { id } = req.query;
        await db.collection('userHistory').doc(id).delete();
        res.status(200).send('Запись успешно удалена.');
    } catch (error) {
        console.error('Ошибка при удалении записи:', error);
        res.status(500).send('Ошибка при удалении записи.');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});