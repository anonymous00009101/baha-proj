import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress,
} from '@mui/material';
import Footer from '../components/Footer';

const GenerateText = () => {
    // Состояния
    const [inputText, setInputText] = useState(''); // Текст, введённый пользователем
    const [generatedText, setGeneratedText] = useState(''); // Сгенерированный текст
    const [error, setError] = useState(''); // Сообщение об ошибке
    const [loading, setLoading] = useState(false); // Состояние загрузки

    // Функция для генерации текста
    const handleGenerateText = async () => {
        if (!inputText.trim()) {
            setError('Введите текст для генерации.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/generate-text/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Добавляем токен
                },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при генерации текста');
            }

            const data = await response.json();
            setGeneratedText(data.generated_text);
            setError('');
        } catch (err) {
            setError('Ошибка при генерации текста. Проверьте ввод.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Генерация текста
            </Typography>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                {/* Поле ввода текста */}
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Введите текст для генерации"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    sx={{ marginBottom: 3 }}
                />
                {/* Кнопка для генерации текста */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleGenerateText}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Сгенерировать текст'}
                </Button>
                {/* Отображение ошибки */}
                {error && (
                    <Alert severity="error" sx={{ marginTop: 3 }}>
                        {error}
                    </Alert>
                )}
                {/* Отображение сгенерированного текста */}
                {generatedText && (
                    <Paper
                        elevation={1}
                        sx={{
                            marginTop: 4,
                            padding: 2,
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Сгенерированный текст:
                        </Typography>
                        <Typography>{generatedText}</Typography>
                    </Paper>
                )}
            </Paper>
            <Footer />
        </Box>
    );
};

export default GenerateText;