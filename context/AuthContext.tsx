import UserInterface from '@/interfaces/user';
import { createContext } from 'react';

interface ContextProps {
    isLoggedIn: boolean;
    user: UserInterface;
    loggingIn: boolean,
    modalBackgroundOpen: boolean,

    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
    openModalBackground: () => void;
}


export const AuthContext = createContext({} as ContextProps );