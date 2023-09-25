import { useReducer, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/api/api';
import { AuthContext, authReducer } from '.';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import UserInterface from '@/interfaces/user';


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
    const {pathname} = useRouter()

    const { replace } = useRouter()

    useEffect(() => {
        checkToken();
    }, [])

    console.log({user: state.user})


    const checkToken = async () => {

        if(pathname === "/login") return;

        try {
            const token = Cookies.get('token')
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
            console.log({userBack : user})
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });

            if (user.TipoUsuario === 2) {
                replace("/onboarding/selectClient")
            } else {
                replace("/onboarding/search")
            }

            setTimeout(() => {
                setLoggingIn(false)
            }, 500);
        } catch (error: any) {
            setLoggingIn(false)
            toast.error(error?.response?.data?.error)
            console.log({ error })
        }
    }

    const logoutUser = async () => {
        try {
            Cookies.remove("token")
            await api.post('/api/auth/logout');
            dispatch({ type: '[Auth] - Logout' });
            replace("/")

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