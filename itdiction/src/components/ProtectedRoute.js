import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        // Если пользователь не аутентифицирован, перенаправляем на страницу входа
        return <Navigate to="/login" replace />;
    }

    // Если пользователь аутентифицирован, отображаем защищённый маршрут
    return <Box sx={{ padding: 4 }}>{children}</Box>;
};

export default ProtectedRoute;