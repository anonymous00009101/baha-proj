import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Timer from '../components/Timer';
import Footer from '../components/Footer';

const ArticulationExercises = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const exercises = [
        { id: 1, title: "🟡 Жылан жаттығуы", text: "Тілді оңға және солға баяу қозғалтыңыз. 5 рет қайталаңыз." },
        { id: 2, title: "🔵 Сағат тілі жаттығуы", text: "Тілді сағат тілі бойынша айналдырыңыз. 10 рет қайталаңыз." },
        { id: 3, title: "🟢 Бақа жаттығуы", text: "Аузыңызды кең ашып, тілді төмен түсіріңіз. 7 рет қайталаңыз." },
        { id: 4, title: "🟠 Қарлығаш жаттығуы", text: "Тілді жоғары көтеріп, таңдайға тигізіңіз. 6 рет қайталаңыз." },
        { id: 5, title: "🔴 Тәтті балмұздақ", text: "Тілді ерінге тигізіп, баяу айналдырыңыз. 8 рет қайталаңыз." },
        { id: 6, title: "🟣 Мысықтың тілі", text: "Тілді алға созып, баяу кері тартыңыз. 5 рет қайталаңыз." },
    ];

    const openModal = (exercise) => {
        setModalContent(exercise);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleTimerComplete = () => {
        alert("Уақыт аяқталды! Келесі жаттығуға көшуге болады.");
        closeModal();
    };

    return (
        <div className="container mt-4">
            <Typography variant="h4" align="center" gutterBottom>
                Айқын әрі таза сөйлеуді дамытуға арналған жаттығулар
            </Typography>
            <Grid container spacing={3}>
                {exercises.map((exercise) => (
                    <Grid item xs={12} sm={6} md={4} key={exercise.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {exercise.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {exercise.text}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => openModal(exercise)}
                                    sx={{ marginTop: 2 }}
                                >
                                    Толығырақ
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={isModalOpen} onClose={closeModal}>
                <DialogTitle>{modalContent.title}</DialogTitle>
                <DialogContent>
                    <Typography>{modalContent.text}</Typography>
                    <Timer initialTime={30} onComplete={handleTimerComplete} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Жабу
                    </Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </div>
    );
};

export default ArticulationExercises;