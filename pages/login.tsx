import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LayoutOnboarding } from '@/components/Layouts/LayoutOnboarding';
import Image from 'next/image';
import PageTransition from '@/components/PageTranstion';
import useErrorHandler from '@/hooks/useErrorHandler';
import Button from '@/components/Buttons/Button';
import styles from "../styles/Pages/Login.module.scss";
import useToast from '@/hooks/useToast';


type FormData = {
    email: string;
    password: string;
};

const Login = () => {

    const { loginUser, loggingIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isEntering, setIsEntering] = useState(true);
    const { handleError } = useErrorHandler();

    const { showSuccess, showError, showSuccessData } = useToast()

    const onLoginUser = async ({ email, password }: FormData) => {
        try {
            const resp = await loginUser(email, password);
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        setIsEntering(false);
    }, []);

    return (

        <PageTransition key="login-transition" isEntering={isEntering === false}>
            <LayoutOnboarding>
                <div className={styles.login}>
                    <div className={styles.content}>

                        <Image
                            src={"/Logo_vertical.png" || ""}
                            alt="Olei online"
                            width={200}
                            height={200}
                            priority={true}
                            unoptimized
                        />

                        <div className={styles.form}>

                            <div className={styles.iconLogin}>
                                <FontAwesomeIcon icon={faArrowRightToBracket} className={`icon`} />
                            </div>

                            <div className={styles.header}>
                                <h1>Bienvenido!</h1>
                                <p className='mb-medium'>Por favor, inicia sesión abajo</p>
                            </div>
                            <form
                                onSubmit={handleSubmit(onLoginUser)}
                                noValidate
                                className={styles.form__content}
                            >
                                <input
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: `Es obligatorio`
                                        }
                                    })}
                                    type="text"
                                    className='input'
                                    placeholder='Escribe tu e-mail...'
                                />
                                {errors.email && <span className='warning-message'>La cuenta es requerida</span>}

                                <input
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: `Es obligatorio`
                                        }
                                    })}
                                    type="password"
                                    className='input'
                                    placeholder='Escribe la contraseña...'
                                />
                                {errors.password && <span className='warning-message'>La contraseña es requerida</span>}

                                <Button
                                    text='Iniciar sesión'
                                    textDisabled='Iniciando...'
                                    typeSubmit
                                    disabled={loggingIn}
                                />
                            </form>
                            
                            <div className={styles.blur}></div>
                        </div>
                    </div>

                </div>
            </LayoutOnboarding>
        </PageTransition>

    );
};

export default Login;
