import axios from 'axios';
import { setLocalStorageItem } from '../utils/localStorage';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

export const login = async (password) => {
    try {
        const res = await api.post('/login', { password }); // Ensure correct endpoint
        if (res.data.token) {
            setLocalStorageItem('token', res.data.token)
        }
        return res.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

