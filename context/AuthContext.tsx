//import UserInterface from '@/interfaces/user';
import { createContext } from 'react';

interface ContextProps {
    isLoggedIn: boolean;
    user?: any;
    loggingIn: boolean,

    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;

}


export const AuthContext = createContext({} as ContextProps );