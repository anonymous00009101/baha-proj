import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Container } from '@mui/material';
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
                        {/* Другие секции */}
                    </Grid>
                </section>
                <section id="premium" style={{ marginBottom: '40px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Купить премиум
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ marginBottom: 2 }}>
                        Получите доступ ко всем функциям приложения.
                    </Typography>
                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            color="success"
                            href="https://wa.me/77755480739?text=Здравствуйте!%20Я%20хочу%20купить%20премиум-версию."
                            target="_blank"
                        >
                            Купить премиум
                        </Button>
                    </Box>
                </section>
                <Footer />
            </Container>
        </Box>
    );
};

export default Home;