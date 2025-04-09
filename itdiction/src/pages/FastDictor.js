import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Stack,
} from '@mui/material';
import Footer from '../components/Footer';
import axios from 'axios';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const FastDictor = () => {
    const [texts] = useState([
        "Көктем келді. Қар еріп, күн жылынды. Ағаштар бүршік жарып, айнала жасыл түске боялды. Адамдар жылы киімдерін шешіп, серуендеуге шықты. Құстар жылы жақтан оралды. Барлығы табиғаттың оянуын қуанышпен қарсы алды.",
        "Қазақтың ұлттық тағамдары – ет, бауырсақ, қымыз, шұбат. Ет – қазақ халқының басты асы. Оны қонаққа арнап асады. Бауырсақ – дастарханның сәні. Оны майға қуырып, шаймен бірге ұсынады. Қымыз бен шұбат – дәруменге бай, шөл басатын сусындар.",
        "Адам өмір бойы білім алады. Білімді адам – табысты адам. Кітап оқу, сабаққа дайындалу, зерттеу жүргізу – бәрі де дамудың жолы. Білім – жарық, білім – болашақтың кілті.",
        "Қазақстан – ұлан-ғайыр жері бар ел. Мұнда биік таулар, кең далалар, мөлдір өзендер бар. Алатау мен Алтайдың шыңдары, Каспий мен Балқаш көлдері – табиғаттың ерекше сыйлары.",
        "Спорт – денсаулықтың кепілі. Жүгіру, жүзу, футбол, бокс – денені шынықтырады. Спортпен айналысқан адам сергек әрі мықты болады. Әр адам салауатты өмір салтын ұстануы керек.",
    ]);
    const [selectedText, setSelectedText] = useState('');
    const [speed, setSpeed] = useState(300);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [history, setHistory] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginUser = async (email, password) => {
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Пользователь вошёл:", userCredential.user);
            setIsLoggedIn(true); // Устанавливаем состояние авторизации
            alert('Вы успешно вошли в систему!');
        } catch (error) {
            console.error("Ошибка при входе:", error);
            alert('Ошибка при входе. Проверьте email и пароль.');
        }
    };

    const handleLogin = () => {
        if (!email || !password) {
            alert('Введите email и пароль.');
            return;
        }
        loginUser(email, password);
    };

    const handleStartText = () => {
        if (!selectedText) {
            alert('Текст таңдаңыз!');
            return;
        }
        setIsPlaying(true);
        setCurrentWordIndex(0);
    };

    const handleStopText = () => setIsPlaying(false);

    useEffect(() => {
        if (isPlaying) {
            const words = selectedText.split(' ');
            const interval = setInterval(() => {
                setCurrentWordIndex((prevIndex) => {
                    if (prevIndex < words.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(interval);
                        setIsPlaying(false);
                        return prevIndex;
                    }
                });
            }, speed);

            return () => clearInterval(interval);
        }
    }, [isPlaying, selectedText, speed]);

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            recorder.ondataavailable = (event) => {
                setAudioChunks((prev) => [...prev, event.data]);
            };

            recorder.start();
            alert('Жазу басталды!');
        } catch (error) {
            alert('Микрофонға қолжетімділік қажет!');
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            alert('Жазу тоқтатылды!');
        }
    };

    const handleSaveRecording = () => {
        if (audioChunks.length === 0) {
            alert('Жазу жоқ!');
            return;
        }

        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.controls = true;

        const audioContainer = document.getElementById('audio-container');
        audioContainer.appendChild(audio);
        setAudioChunks([]);
    };

    const saveToDatabase = async (transcriptText, advice) => {
        try {
            await addDoc(collection(db, 'userHistory'), {
                transcript: transcriptText,
                advice: advice,
                timestamp: new Date(),
            });
            alert('История успешно сохранена!');
        } catch (error) {
            console.error('Ошибка при сохранении в базу данных:', error);
            alert('Ошибка при сохранении истории.');
        }
    };

    const fetchHistory = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error("Пользователь не авторизован.");
            return;
        }

        try {
            const token = await user.getIdToken();
            const response = await fetch("http://localhost:5000/getUserHistory", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setHistory(data); // Обновляем состояние истории
        } catch (error) {
            console.error("Ошибка при получении истории:", error);
        }
    };

    const deleteHistoryItem = async (id) => {
        try {
            await deleteDoc(doc(db, 'userHistory', id));
            alert('Запись успешно удалена!');
            setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id)); // Удаляем из состояния
        } catch (error) {
            console.error('Ошибка при удалении записи:', error);
            alert('Ошибка при удалении записи.');
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            {!isLoggedIn ? (
                <Box sx={{ marginBottom: 4 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Вход в систему
                    </Typography>
                    <Stack spacing={2} alignItems="center">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: '8px', width: '300px' }}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '8px', width: '300px' }}
                        />
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            Войти
                        </Button>
                    </Stack>
                </Box>
            ) : (
                <>
                    <Typography variant="h4" align="center" gutterBottom>
                        Текст таңдау және жылдамдықты баптау
                    </Typography>
                    <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="text-select-label">Текст таңдау</InputLabel>
                                <Select
                                    labelId="text-select-label"
                                    value={selectedText}
                                    onChange={(e) => setSelectedText(texts[e.target.value])}
                                >
                                    <MenuItem value="">
                                        <em>Текст таңдаңыз</em>
                                    </MenuItem>
                                    {texts.map((text, index) => (
                                        <MenuItem key={index} value={index}>
                                            Текст {index + 1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="speed-select-label">Жылдамдық деңгейі</InputLabel>
                                <Select
                                    labelId="speed-select-label"
                                    value={speed}
                                    onChange={(e) => setSpeed(Number(e.target.value))}
                                >
                                    <MenuItem value={700}>1 - Өте баяу</MenuItem>
                                    <MenuItem value={500}>2 - Баяу</MenuItem>
                                    <MenuItem value={300}>3 - Орташа</MenuItem>
                                    <MenuItem value={200}>4 - Жылдам</MenuItem>
                                    <MenuItem value={100}>5 - Өте жылдам</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
                        <Button variant="contained" color="primary" onClick={handleStartText}>
                            📜 Текстті бастау
                        </Button>
                        <Button variant="contained" color="error" onClick={handleStopText}>
                            ⏹ Тоқтату
                        </Button>
                        <Button variant="contained" color="success" onClick={handleStartRecording}>
                            🎤 Жазуды бастау
                        </Button>
                        <Button variant="contained" color="warning" onClick={handleStopRecording}>
                            ⏹ Жазуды тоқтату
                        </Button>
                        <Button variant="contained" color="info" onClick={handleSaveRecording}>
                            💾 Жазуды сақтау
                        </Button>
                    </Stack>
                    <Typography variant="h5" align="center" gutterBottom>
                        {selectedText.split(' ')[currentWordIndex] || ''}
                    </Typography>
                    <Box id="audio-container" sx={{ textAlign: 'center' }}></Box>
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            История пользователя
                        </Typography>
                        {history.map((item) => (
                            <Box key={item.id} sx={{ marginBottom: 2, padding: 2, border: '1px solid #ccc' }}>
                                <Typography>Транскрипция: {item.transcript}</Typography>
                                <Typography>Кеңес: {item.advice}</Typography>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteHistoryItem(item.id)}
                                >
                                    Удалить
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    <Footer />
                </>
            )}
        </Box>
    );
};

export default FastDictor;