import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export const useErrorHandler = () =>  {
    const router = useRouter();

    const handleError = (error: any) => {

        const { response: { status } } = error ?? {}

        if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') return;

        if( status ) {
            if (status === 404) {
                router.push('/404');
            } else if (status === 401) {
                router.push('/login');
            } else if (status === 403) {
                router.push('/login');
            } else if (status === 500) {
                router.push('/500');
            } else {
                router.push('/400');
            }
        } else {
            return toast.error("Algo salio mal!")
        }

    };

    return { handleError };
}

export default useErrorHandler;
