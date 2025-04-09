// filepath: src/App.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import FastDictor from './pages/FastDictor';
import ArticulationExercises from './pages/ArticulationExercises';
import SpeechExercises from './pages/SpeechExercises';
import GenerateText from './pages/GenerateText';
import Profile from './pages/Profile'; // Импортируем страницу профиля
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние аутентификации
    const [user, setUser] = useState({ name: 'Иван Иванов', email: 'ivan@example.com' }); // Информация о пользователе

    const handleSignOut = () => {
        setIsAuthenticated(false); // Сбрасываем состояние аутентификации
        setUser(null); // Очищаем данные пользователя
    };

    const protectedRoutes = [
        { path: '/', element: <Home /> },
        { path: '/fast-dictor', element: <FastDictor /> },
        { path: '/articulation-exercises', element: <ArticulationExercises /> },
        { path: '/speech-exercises', element: <SpeechExercises /> },
        { path: '/generate-text', element: <GenerateText /> },
        { path: '/profile', element: <Profile user={user} onSignOut={handleSignOut} /> }, // Добавляем маршрут профиля
    ];

    return (
        <>
            <Header title="DictionPro" isAuthenticated={isAuthenticated} user={user} />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                {protectedRoutes.map(({ path, element }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                {element}
                            </ProtectedRoute>
                        }
                    />
                ))}
                <Route
                    path="*"
                    element={
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <h1>404 - Страница не найдена</h1>
                        </div>
                    }
                />
            </Routes>
        </>
    );
};

export default App;