import { useReducer, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/api/api';
import { AuthContext, authReducer } from '.';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';


export interface AuthState {
    isLoggedIn: boolean;
    user?: any;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false)

    const { replace } = useRouter()

    useEffect(() => {
        checkToken();
    }, [])


    const checkToken = async () => {
        try {
            const token = Cookies.get('token')
            console.log({token})
            const { data } = await api.get<any>('/api/auth/renew', {
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token || ''
                }
            });
            Cookies.set('token', data.token as string);
            dispatch({ type: '[Auth] - Login', payload: data.user });
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async (email: string, password: string) => {
        setLoggingIn(true)
        try {
            const data = await api.post('/api/auth/login', { email, password });
            const { token, user } = data.data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            replace("/")
            setLoggingIn(false)
        } catch (error: any) {
            setLoggingIn(false)
            toast.error(error?.response?.data?.error)
            console.log(error?.response?.data?.error)
        }
    }

    const logoutUser = async () => {
        try {
            Cookies.remove("token")
            const data = await api.post('/api/auth/logout');
            dispatch({ type: '[Auth] - Logout'});
            replace("/login")

        } catch (error: any) {
            toast.error(error?.response?.data?.error)
            console.log(error?.response?.data?.error)
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