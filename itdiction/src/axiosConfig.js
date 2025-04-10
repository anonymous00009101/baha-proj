const BASE_URL = 'http://localhost:8000/api/';

// Функция для выполнения запросов с токеном
const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401 && !options._retry) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
            return apiFetch(endpoint, {
                ...options,
                _retry: true,
                headers: {
                    ...headers,
                    Authorization: `Bearer ${newAccessToken}`,
                },
            });
        }
    }

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
    }

    return response.json();
};

// Функция для обновления токена
const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await fetch(`${BASE_URL}token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Ошибка обновления токена');
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        return data.access;
    } catch (err) {
        console.error('Ошибка обновления токена:', err);
        return null;
    }
};

export default apiFetch;