// hooks/useToast.ts
import { toast } from 'react-hot-toast';

const useToast = () => {
    const showSuccess = (message: string) => {
        toast.success(message,
            {
                style: {
                    border: '1px solid #1F8A70',
                    padding: '10px 20px',
                    color: '#1F8A70',
                },
                iconTheme: {
                    primary: '#1F8A70',
                    secondary: '#FFFAEE',
                },
            }
        );
    };

    const showError = (message: string) => {
        toast.error(message,
            {
                style: {
                    border: '1px solid #ff0000',
                    padding: '10px 20px',
                    color: '#ff0000',
                },
                iconTheme: {
                    primary: '#ff0000',
                    secondary: '#FFFAEE',
                },
            }
        );
    };

    const showInfo = (message: string) => {
        toast(message, {
            duration: 4000,
            position: 'top-right',
        });
    };

    return {
        showSuccess,
        showError,
        showInfo,
    };
};

export default useToast;
