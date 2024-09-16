import { useReducer, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from '.';
import { useRouter } from 'next/router';
import UserInterface from '@/interfaces/user';
import useErrorHandler from '@/hooks/useErrorHandler';
import handler from '@/pages/api/session';
import { api } from '@/api/api';


export interface AuthState {
    isLoggedIn: boolean;
    user?: UserInterface;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false)
    const { pathname } = useRouter()
    const { handleError } = useErrorHandler()

    const { push } = useRouter()

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {

        if (pathname === "/login") return;

        /* try {
            const { data } = await api.get('/api/auth/renewWeb');
            Cookies.set('token', data.token);
            dispatch({ type: '[Auth] - Login', payload: data.user });
        } catch (error) {
            Cookies.remove('token');
            handleError(error);
        } */
    }

    const loginUser = async (email: string, password: string) => {
        setLoggingIn(true); // Indicador de inicio de sesión en curso
    
        try {
            const body = { email, password };
    
            // Usamos nuestra función api para hacer la solicitud
            const data = await api('/api/auth/loginWeb', {
                method: 'POST',
                body: JSON.stringify(body),
            });
    
            console.log({data})
            // Extraemos el token y el usuario de la respuesta
            const { token, user } = data;
    
            // Guardamos el token en cookies
            Cookies.set('token', token);
    
            // Actualizamos el estado de autenticación en el contexto
            dispatch({ type: '[Auth] - Login', payload: user });
    
            // Redireccionamos según el tipo de usuario
            if (user.TipoUsuario === 2) {
                push("/onboarding/selectClient");
            } else {
                push("/products");
            }
    
        } catch (error: any) {
            console.error('Error al iniciar sesión:', error);
            handleError(error);
        } finally {
            setLoggingIn(false);
        }
    };
    

    const logoutUser = async () => {
        try {
            Cookies.remove("token")
            //await api.get('/api/auth/logout');
            push("/")
            setLoggingIn(false);
            dispatch({ type: '[Auth] - Logout' });
        } catch (error: any) {
            handleError(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loggingIn,

            // Methods
            loginUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>

    )
};