import { useReducer, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/api/api';
import { AuthContext, authReducer } from '.';
import { useRouter } from 'next/router';
import UserInterface from '@/interfaces/user';
import useErrorHandler from '@/hooks/useErrorHandler';


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

        try {
            const { data } = await api.get('/api/auth/renewWeb');
            Cookies.set('token', data.token);
            dispatch({ type: '[Auth] - Login', payload: data.user });
        } catch (error) {
            Cookies.remove('token');
            handleError(error);
        }
    }

    const loginUser = async (email: string, password: string) => {
        setLoggingIn(true)
        try {
            const data = await api.post('/api/auth/loginWeb', { email, password });
            const { token, user } = data.data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });


            if (user.TipoUsuario === 2) {
                push("/onboarding/selectClient");
            } else {
                push("/products");
            }

        } catch (error: any) {
            setLoggingIn(false)
            handleError(error);
        }
    }

    const logoutUser = async () => {
        try {
            Cookies.remove("token")
            await api.get('/api/auth/logout');
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