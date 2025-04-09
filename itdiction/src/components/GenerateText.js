import React, { useState } from 'react';
import axios from 'axios';
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

    const handleGenerateText = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/generate-text/',
                { text: inputText },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Передаём токен в заголовке
                    },
                }
            );
            setGeneratedText(response.data.generated_text);
            setError('');
        } catch (err) {
            setError('Ошибка при генерации текста. Проверьте ввод.');
            console.error(err);
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
                >
                    Сгенерировать текст
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