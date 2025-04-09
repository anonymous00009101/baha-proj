/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// API для получения истории пользователя
exports.getUserHistory = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("userHistory").get();
    const history = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(history);
  } catch (error) {
    console.error("Ошибка при получении истории:", error);
    res.status(500).send("Ошибка при получении истории.");
  }
});

// API для добавления записи в историю
exports.addUserHistory = functions.https.onRequest(async (req, res) => {
  try {
    const {transcript, advice} = req.body;
    const docRef = await db.collection("userHistory").add({
      transcript,
      advice,
      timestamp: new Date(),
    });
    res.status(201).json({id: docRef.id});
  } catch (error) {
    console.error("Ошибка при добавлении записи:", error);
    res.status(500).send("Ошибка при добавлении записи.");
  }
});

// API для удаления записи из истории
exports.deleteUserHistory = functions.https.onRequest(async (req, res) => {
  try {
    const {id} = req.query;
    await db.collection("userHistory").doc(id).delete();
    res.status(200).send("Запись успешно удалена.");
  } catch (error) {
    console.error("Ошибка при удалении записи:", error);
    res.status(500).send("Ошибка при удалении записи.");
  }
});
