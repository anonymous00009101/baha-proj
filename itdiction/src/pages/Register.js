import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
} from '@mui/material';
import Footer from '../components/Footer';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'Имя пользователя обязательно.';
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Введите корректный email.';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:8000/api/users/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Ошибка регистрации. Проверьте введённые данные.');
                }

                setSuccessMessage('Регистрация прошла успешно!');
                setErrorMessage('');
                setFormData({ username: '', email: '', password: '' });

                // Перенаправление на страницу входа
                setTimeout(() => navigate('/login'), 2000);
            } catch (error) {
                console.error('Ошибка регистрации:', error.message);
                setErrorMessage(error.message);
                setSuccessMessage('');
            }
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: '0 auto' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Регистрация
                </Typography>
                {successMessage && (
                    <Alert severity="success" sx={{ marginBottom: 3 }}>
                        {successMessage}
                    </Alert>
                )}
                {errorMessage && (
                    <Alert severity="error" sx={{ marginBottom: 3 }}>
                        {errorMessage}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Имя пользователя"
                        name="username"
                        variant="outlined"
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        sx={{ marginBottom: 3 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ marginBottom: 3 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Пароль"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{ marginBottom: 3 }}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginBottom: 3 }}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                <Typography align="center">
                    <Button component={Link} to="/" variant="text">
                        ← Назад на главную
                    </Button>
                </Typography>
            </Paper>
            <Footer />
        </Box>
    );
};

export default Register;