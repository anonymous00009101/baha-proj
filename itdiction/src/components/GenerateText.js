import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
} from '@mui/material';

const GenerateText = () => {
    const [inputText, setInputText] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const refreshAccessToken = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: localStorage.getItem('refreshToken') }),
            });

            if (!response.ok) {
                throw new Error('Не удалось обновить токен');
            }

            const data = await response.json();
            localStorage.setItem('accessToken', data.access);
        } catch (error) {
            console.error('Ошибка обновления токена:', error);
        }
    };

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
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleGenerateText}
                    disabled={loading}
                >
                    {loading ? 'Генерация...' : 'Сгенерировать текст'}
                </Button>
                {error && (
                    <Alert severity="error" sx={{ marginTop: 3 }}>
                        {error}
                    </Alert>
                )}
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
        </Box>
    );
};

export default GenerateText;