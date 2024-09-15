import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export const useErrorHandler = () => {
    const router = useRouter();

    const handleError = (error: any) => {
        // Verifica que error y error.response existan antes de acceder a error.response.status
        const status = error?.response?.status;

        if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') return;

        /* if (status) {
            switch (status) {
                case 404:
                    router.push('/404');
                    break;
                case 401:
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
        } */
    };

    return { handleError };
}


export default useErrorHandler;
