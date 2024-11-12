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
                    fontSize: 14,
                    backgroundColor: "#dbfff5"
                },
                iconTheme: {
                    primary: '#1F8A70',
                    secondary: '#FFFAEE',
                },
            }
        );
    };

    const showSuccessData = (message: string) => {
        toast.success(message,
            {
                position: "bottom-left",
                style: {
                    border: '1px solid #1F8A70',
                    padding: '10px 20px',
                    color: '#1F8A70',
                    fontSize: 14,
                    backgroundColor: "#dbfff5"
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
                    backgroundColor: '#f7dfdf'
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

    const showPromise = (message: string, messageSuccess: string, myPromise: Promise<unknown>) => {
        toast.promise(
            myPromise,
            {
                loading: message,
                success: <b>{messageSuccess}</b>,
                error: <b>No se guardo</b>,
            },
            {
                style: {
                    border: '1px solid #1F8A70',
                    padding: '10px 20px',
                    color: '#1F8A70',
                    fontSize: 14,
                    backgroundColor: "#dbfff5"
                },
                iconTheme: {
                    primary: '#1F8A70',
                    secondary: '#FFFAEE',
                },
            }
        );
    }

    return {
        showSuccess,
        showSuccessData,
        showError,
        showInfo,
        showPromise
    };
};

export default useToast;
