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
    TextField,
    Paper,
} from '@mui/material';
import Footer from '../components/Footer';

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
    const [chatInput, setChatInput] = useState(''); // Поле для ввода текста чата
    const [chatMessages, setChatMessages] = useState([]); // Сообщения чата

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        setChatMessages((prev) => [...prev, { sender: 'user', text: chatInput }]);
        setChatInput('');
        // Здесь можно добавить логику отправки сообщения на сервер для обработки ИИ
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

    return (
        <Box sx={{ padding: 4 }}>
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

            {/* Чат с ИИ */}
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Чат с ИИ
                </Typography>
                <Box sx={{ maxHeight: 200, overflowY: 'auto', marginBottom: 2 }}>
                    {chatMessages.map((msg, index) => (
                        <Typography
                            key={index}
                            align={msg.sender === 'user' ? 'right' : 'left'}
                            sx={{
                                backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#f1f8e9',
                                padding: 1,
                                borderRadius: 2,
                                marginBottom: 1,
                            }}
                        >
                            {msg.text}
                        </Typography>
                    ))}
                </Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Введите сообщение..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                    Отправить
                </Button>
            </Paper>

            <Footer />
        </Box>
    );
};

export default FastDictor;