import axios from 'axios';
import Cookies from 'js-cookie';

/* export const api = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        withCredentials: true,  // Esto permite enviar las cookies con cada solicitud
    }
)
 */

const baseURL = process.env.NEXT_PUBLIC_API_URL || ''; // Asegúrate de configurar esto en tu archivo .env

// Función personalizada para hacer solicitudes con fetch
export const api = async (path: string, options: RequestInit = {}) => {
    const url = `${baseURL}${path}`;

    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...options.headers,
        },
        credentials: 'include',
        ...options,
    };

    try {
        // Hacemos la solicitud a la API
        const response = await fetch(url, defaultOptions);

        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error en la solicitud');
        }

        // Parseamos la respuesta como JSON
        return await response.json();
    } catch (error: any) {
        console.error('Error al hacer la solicitud:', error);
        throw error;
    }
};



// Interceptor to add the token to headers
/* api.interceptors.request.use(
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
); */