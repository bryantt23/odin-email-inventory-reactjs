import axios from 'axios'
import { getToken, removeToken } from '../utils/token'
import { useNavigate } from 'react-router-dom'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(
    (config) => {
        const token = getToken()
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
            removeToken()
            window.location.href = '/.login'
        }
        return Promise.reject(error)
    }
)

export default api