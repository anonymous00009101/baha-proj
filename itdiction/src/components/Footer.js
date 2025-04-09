import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                textAlign: 'center',
                py: 3,
                backgroundColor: 'primary.main',
                color: 'white',
            }}
        >
            <Typography variant="body2">
                © 2025 DictionPro. Барлық құқықтар қорғалған.
            </Typography>
        </Box>
    );
};

export default Footer;