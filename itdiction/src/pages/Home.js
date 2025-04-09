import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Grid,
    Card,
    CardContent,
    Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Container>
                <section id="services" style={{ marginBottom: '40px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Біздің қызметтер
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h3" align="center">
                                        🎤
                                    </Typography>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Артикуляциялық жаттығулар
                                    </Typography>
                                    <Typography variant="body2" align="center" color="text.secondary">
                                        Айқын және сенімді сөйлеу дағдыларын дамыту.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        component={Link}
                                        to="/articulation-exercises"
                                        sx={{ marginTop: 2 }}
                                    >
                                        Толығырақ
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h3" align="center">
                                        🚀
                                    </Typography>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Жылдам сөйлеу
                                    </Typography>
                                    <Typography variant="body2" align="center" color="text.secondary">
                                        Жылдамдықты және күрделі сөздерді меңгеруге көмектесетін жаттығулар.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        component={Link}
                                        to="/speech-exercises"
                                        sx={{ marginTop: 2 }}
                                    >
                                        Толығырақ
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h3" align="center">
                                        🎮
                                    </Typography>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Быстрый диктор ойыны
                                    </Typography>
                                    <Typography variant="body2" align="center" color="text.secondary">
                                        Сөйлеу жылдамдығы мен анықтығын арттыруға көмектесетін ойындар.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        component={Link}
                                        to="/fast-dictor"
                                        sx={{ marginTop: 2 }}
                                    >
                                        Толығырақ
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </section>

                <section id="pricing" style={{ marginBottom: '40px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Бағалар
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Бесплатный
                                    </Typography>
                                    <Typography variant="body2" align="center" color="text.secondary">
                                        Негізгі мүмкіндіктер
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Premium
                                    </Typography>
                                    <Typography variant="body2" align="center" color="text.secondary">
                                        Толық мүмкіндіктер жиынтығы
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" sx={{ marginTop: 3 }}>
                        <Button
                            variant="contained"
                            color="success"
                            component={Link}
                            to="/register"
                        >
                            Регистрация
                        </Button>
                    </Box>
                </section>

                <section id="contact" style={{ marginBottom: '40px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Байланыс
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                        Сұрақтарыңыз болса, бізге хабарласыңыз.
                    </Typography>
                </section>
            </Container>
            <Footer />
        </Box>
    );
};

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
            setGeneratedText(response.data.generated_text); // Устанавливаем сгенерированный текст
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
            <Footer />
        </Box>
    );
};

export default Home;
export { GenerateText };