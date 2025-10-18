// responseInterceptors.ts
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import Cookies from "js-cookie";



interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

// Interceptor para respuestas exitosas (sin modificación, pero se mantiene para consistencia)
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

// Interceptor de errores – centralizamos el manejo de distintos status y casos especiales
export const errorResponseInterceptor = async (error: AxiosError): Promise<never> => {

    // Extraemos la configuración original y el status de la respuesta si existe
    const status = error.response?.status;

    if (status === 401) {
        Cookies.remove('refreshToken')
        Cookies.remove('client')
        window.location.href = '/login';
    }

    // Para todos los demás errores, simplemente retornamos el rechazo
    return Promise.reject(error);
};
