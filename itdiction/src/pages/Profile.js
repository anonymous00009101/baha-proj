import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Profile = ({ user, onSignOut }) => {
    return (
        <Box sx={{ padding: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Профиль пользователя
            </Typography>
            <Typography variant="h6">Имя: {user.name}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 3 }}
                onClick={onSignOut}
            >
                Выйти
            </Button>
        </Box>
    );
};

export default Profile;