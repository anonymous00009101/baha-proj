import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
} from '@mui/material';
import Footer from '../components/Footer';

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Простая проверка (замените на реальную проверку через API)
        if (username === 'admin' && password === 'password') {
            setIsAuthenticated(true);
            navigate('/'); // Перенаправляем на главную страницу
        } else {
            setError('Неверное имя пользователя или пароль');
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: '0 auto' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Вход
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Имя пользователя"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ marginBottom: 3 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ marginBottom: 3 }}
                        required
                    />
                    {error && (
                        <Alert severity="error" sx={{ marginBottom: 3 }}>
                            {error}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Войти
                    </Button>
                </form>
            </Paper>
            <Footer />
        </Box>
    );
};

export default Login;