import axios from 'axios';

const userDebtApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

userDebtApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export { userDebtApi };
