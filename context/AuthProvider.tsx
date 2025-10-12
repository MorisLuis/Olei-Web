import { useReducer, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/api/api';
import { AuthContext, authReducer } from '.';
import { useRouter } from 'next/router';
import UserInterface from '@/interfaces/user';
import useErrorHandler from '@/hooks/useErrorHandler';
import { ApiError } from '@/interfaces/error';
import { useToast } from '@/hooks';

export interface AuthState {
    isLoggedIn: boolean;
    user: UserInterface;
}

export const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: {
        Id_Almacen: 0,
        Nombre: '',
        Id_ListPre: 0,
        Id_Cliente: 0,
        Id_UsuarioOOL: '',
        Baseweb: '',
        TipoUsuario: 1,
        PrecioIncIVA: 0,
        Company: '',
        SwImagenes: 0,
        SwSinStock: 0
    }
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);
    const [modalBackgroundOpen, setModalBackgroundOpen] = useState(false)
    const { pathname } = useRouter();
    const { handleError } = useErrorHandler()
    const { showError } = useToast()

    const { push, replace } = useRouter()

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
            setLoggingIn(false)
        }
    }

    const loginUser = async (email: string, password: string) => {
        setLoggingIn(true);
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
        } catch (error) {
            const apiError = error as ApiError;
            
            // Accede de forma segura al mensaje de error dentro de `errors`
            const message = apiError.response?.data?.errors?.[0]?.message ?? "An unexpected error occurred";
    
            showError(message)
            setLoggingIn(false);
            handleError(apiError);
        }
    };
    

    const logoutUser = async () => {
        try {
            await api.get('/api/auth/logout');
            replace("/login")
            Cookies.remove("token")
            dispatch({ type: '[Auth] - Logout', user: AUTH_INITIAL_STATE.user });
        } catch (error) {
            push("/")
            Cookies.remove("token")
            handleError(error);
        } finally {
            setLoggingIn(false);
        }
    }

    const openModalBackground = () => {
        setModalBackgroundOpen(!modalBackgroundOpen)
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            loggingIn,
            modalBackgroundOpen,

            // Methods
            loginUser,
            logoutUser,
            openModalBackground
        }}>
            {children}
        </AuthContext.Provider>

    )
};