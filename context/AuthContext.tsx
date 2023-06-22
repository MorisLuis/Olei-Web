//import UserInterface from '@/interfaces/user';
import { createContext } from 'react';

interface ContextProps {
    isLoggedIn: boolean;
    user?: any;

    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;

}


export const AuthContext = createContext({} as ContextProps );