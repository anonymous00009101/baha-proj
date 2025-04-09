import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Timer = ({ initialTime, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onComplete) onComplete();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onComplete]);

    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: 3,
                backgroundColor: timeLeft > 0 ? 'lightblue' : 'lightcoral',
                borderRadius: 2,
                border: '1px solid',
                borderColor: timeLeft > 0 ? 'primary.main' : 'error.main',
            }}
        >
            {timeLeft > 0 ? (
                <Typography variant="h5" color="primary">
                    {timeLeft} секунд
                </Typography>
            ) : (
                <Typography variant="h5" color="error">
                    Уақыт аяқталды!
                </Typography>
            )}
        </Box>
    );
};

export default Timer;