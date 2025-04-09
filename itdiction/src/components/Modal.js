// filepath: src/components/Modal.js
import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';

const Modal = ({ isOpen, onClose, title, text, timer, children }) => {
    // Закрытие модального окна при нажатии клавиши "Escape"
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            {title && (
                <DialogTitle>
                    <Typography variant="h6">{title}</Typography>
                </DialogTitle>
            )}
            <DialogContent>
                {text && (
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        {text}
                    </Typography>
                )}
                {timer && (
                    <Box sx={{ marginBottom: 2 }}>
                        {timer}
                    </Box>
                )}
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;