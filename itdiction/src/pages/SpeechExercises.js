import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Paper,
} from '@mui/material';
import Footer from '../components/Footer';

const SpeechExercises = () => {
    const [twisters, setTwisters] = useState([]);
    const texts = {
        articulation: [
            'Қара қарақат, қара қарақат, қара қарақат.',
            'Бақа бақаны бақады, бақа бақылдайды.',
            'Жеті жолбарыс жортады, жолында жолбарыс жоқ.',
            'Тәтті тәтті тәтті, тәтті тәтті тәтті!',
            'Қызыл қасқыр қыр асып кетті.',
            'Көк көлік көпірден өтті.',
            'Бала бал балмұздақ жейді.',
            'Жылдам жылан жылжиды.',
            'Аспан астында ақпан аяз.',
            'Үйдің іші үйдей жылы.',
        ],
        speed: [
            'Шырша шырыны шырынды.',
            'Сары сарымсақ сарғайды.',
            'Бота боздап барады.',
            'Қара қазанда қара қайнатпа қайнайды.',
            'Тау-тасты аралап, таңдай татады.',
            'Қарға қар үстінде қарқылдайды.',
            'Көктемде көк құрақ көгерер.',
            'Күміс қоңырау күмбірлеп кетті.',
            'Ақ аю айдында айқара жүр.',
            'Жылан жылжыды, жылдам жылжып.',
        ],
        complexity: [
            'Қырық құмырсқа қырман қырда қырықтық.',
            'Шымшық шырылдап, шынарға шықты.',
            'Сүттен сүзбе сүзілді.',
            'Жеті жорға желе шапты.',
            'Торғай торда тұр.',
            'Шырша шырышы шырынды.',
            'Айдында аққу ақырын жүзеді.',
            'Жолбарыс жол үстінде жортады.',
            'Қарлығаш қанат қағып қалықтайды.',
            'Шөжелер шырылдайды, шөпке шомады.',
        ],
    };

    const showTwisters = (category) => {
        setTwisters(texts[category]);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Сөйлеу дағдыларын дамытуға арналған жаттығулар
            </Typography>
            <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                <Grid item xs={12} md={4}>
                    <Card
                        variant="outlined"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => showTwisters('articulation')}
                    >
                        <CardContent>
                            <Typography variant="h5" align="center">
                                Айқындық 👄
                            </Typography>
                            <Typography variant="body2" align="center" color="text.secondary">
                                Дауыс анық болсын
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card
                        variant="outlined"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => showTwisters('speed')}
                    >
                        <CardContent>
                            <Typography variant="h5" align="center">
                                Жылдамдық 🏃‍♂️
                            </Typography>
                            <Typography variant="body2" align="center" color="text.secondary">
                                Тез сөйлеуді үйреніңіз
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card
                        variant="outlined"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => showTwisters('complexity')}
                    >
                        <CardContent>
                            <Typography variant="h5" align="center">
                                Күрделілік 🎭
                            </Typography>
                            <Typography variant="body2" align="center" color="text.secondary">
                                Қиын сөздерді меңгеріңіз
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Paper elevation={3} sx={{ padding: 3 }}>
                {twisters.length > 0 ? (
                    <List>
                        {twisters.map((twister, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={twister} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography align="center" color="text.secondary">
                        Категорияны таңдаңыз, жаңылтпаштар осында көрсетіледі.
                    </Typography>
                )}
            </Paper>
            <Footer />
        </Box>
    );
};

export default SpeechExercises;