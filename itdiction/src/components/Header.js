// filepath: src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    IconButton,
    Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = ({ title, isAuthenticated, setIsAuthenticated }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Удаляем токены из localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Обновляем состояние аутентификации
        setIsAuthenticated(false);

        // Закрываем меню
        handleMenuClose();

        // Перенаправляем на страницу входа
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">
                        Басты бет
                    </Button>
                    <Button color="inherit" component={Link} to="/articulation-exercises">
                        Артикуляция
                    </Button>
                    <Button color="inherit" component={Link} to="/speech-exercises">
                        Жылдам сөйлеу
                    </Button>
                    <Button color="inherit" component={Link} to="/fast-dictor">
                        Диктор ойыны
                    </Button>
                    <Button color="inherit" component={Link} to="/generate-text">
                        Генерация текста
                    </Button>
                    {isAuthenticated ? (
                        <>
                            <IconButton
                                color="inherit"
                                onClick={handleMenuOpen}
                                aria-controls="profile-menu"
                                aria-haspopup="true"
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            <Menu
                                id="profile-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                                    Профиль
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Выйти
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Вход
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Регистрация
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;