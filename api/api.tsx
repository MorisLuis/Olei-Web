import axios from 'axios';
import Cookies from 'js-cookie';
import { errorResponseInterceptor, responseInterceptor } from './responseInterceptor';

export const api = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        withCredentials: true,
    }
)


// Interceptor to add the token to headers
api.interceptors.request.use(
    async config => {
        const token = Cookies.get('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },

    error => {
        return Promise.reject(error);
    }
);

// 🚀 interceptores de respuesta
api.interceptors.response.use(
    responseInterceptor,
    errorResponseInterceptor
);
