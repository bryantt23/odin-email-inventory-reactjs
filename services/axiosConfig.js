import axios from 'axios'
import { getLocalStorageItem, removeLocalStorageItem } from '../utils/localStorage'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    (config) => {
        const token = getLocalStorageItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true

            // If no refresh token logic, clear the token and redirect to login
            removeLocalStorageItem('token')
            removeLocalStorageItem('messages')
            window.location.href = '/.login'
        }
        return Promise.reject(error)
    }
)

export default api