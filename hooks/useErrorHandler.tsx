import { AuthContext } from '@/context';
import { sendError } from '@/services/errors';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import toast from 'react-hot-toast';

export const useErrorHandler = () => {
    const router = useRouter();
    const { user, logoutUser } = useContext(AuthContext);

    const handleError = async (error: any) => {

        // Verifica que error y error.response existan antes de acceder a error.response.status
        const status = error?.response?.status;
        const method = error?.response?.config?.method;

        const message = error?.response?.data?.error ? error?.response?.data?.error :
            error?.response?.data?.message ? error?.response?.data?.message :
                error?.message ? error?.message : error;

        if (status === 401 || status === '401') {
            console.log("session ended");
            return logoutUser?.();
        }

        await sendError({
            From: `web/${user?.Id_UsuarioOOL?.trim()}`,
            Message: message,
            Id_Usuario: user?.Id_UsuarioOOL?.trim(),
            Metodo: method || '',
            code: status?.toString()
        })

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
            toast.error("Algo salió mal!");
        }
    };

    return { handleError };
}


export default useErrorHandler;
