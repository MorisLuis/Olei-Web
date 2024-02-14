import UserInterface from '@/interfaces/user';
import { createContext } from 'react';

interface ContextProps {
    isLoggedIn: boolean;
    user?: UserInterface;
    loggingIn: boolean,
    isDemo: boolean,

    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}


export const AuthContext = createContext({} as ContextProps );