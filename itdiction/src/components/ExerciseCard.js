// filepath: src/components/ExerciseCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ExerciseCard = ({ title, onClick }) => {
    return (
        <Card variant="outlined" sx={{ textAlign: 'center', padding: 2, marginBottom: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Button variant="contained" color="primary" onClick={onClick}>
                    Толығырақ
                </Button>
            </CardContent>
        </Card>
    );
};

export default ExerciseCard;