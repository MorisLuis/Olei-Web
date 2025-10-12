import { AuthContext } from '@/context';
import { sendError } from '@/services/errors';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useToast } from './useToast';

export const useErrorHandler = () => {
    const router = useRouter();
    const { user, logoutUser } = useContext(AuthContext);
    const { showError } = useToast()

    const handleError = async (error: any) => {
        // Accede de forma segura a las propiedades de error
        const status = error.response?.status;
        const method = error.response?.config?.method;
        
        const message = error.response?.data?.error 
            ?? error.response?.data?.message 
            ?? error.message 
            ?? "Unknown error";
    
        if (status === 401) {
            return logoutUser?.();
        }
    
        await sendError({
            From: `web/${user?.Id_UsuarioOOL?.trim()}`,
            Message: message,
            Id_Usuario: user?.Id_UsuarioOOL?.trim(),
            Metodo: method || '',
            code: (status as string)?.toString()
        });
    
        if (status) {
            switch (status) {
                case 404:
                    router.push('/404');
                    break;
                case 403:
                    router.push('/login');
                    break;
                case 500:
                    router.push('/500');
                    break;
                default:
                    router.push('/404');
                    break;
            }
        } else {
            showError("Algo salió mal!");
        }
    };
    
    return { handleError };
}


export default useErrorHandler;
