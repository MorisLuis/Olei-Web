import { useContext, useEffect, useState } from 'react';
import styles from "../styles/Pages/Login.module.scss";

import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LayoutOnboarding } from '@/components/Layouts/LayoutOnboarding';
import Image from 'next/image';
import PageTransition from '@/components/PageTranstion';
import useErrorHandler from '@/hooks/useErrorHandler';
import Button from '@/components/Buttons/Button';


type FormData = {
    email: string;
    password: string;
};

const Login = () => {

    const { loginUser, loggingIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isEntering, setIsEntering] = useState(true);
    const { handleError } = useErrorHandler()

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
                <div className={`${styles.login}`}>
                    <div className={`${styles.content} display-flex column allCenter`}>
                        <Image
                            src={"/logo01.png" || ""}
                            alt="photo"
                            width={200}
                            height={200}
                            priority={true}
                            unoptimized
                        />
                        <div className={`${styles.form} display-flex column justify`}>

                            <div className={`${styles.iconLogin} mb-small display-flex allCenter`}>
                                <FontAwesomeIcon icon={faArrowRightToBracket} className={`icon`} />
                            </div>

                            <h1>Bienvenido!</h1>
                            <p className='mb-medium'>Por favor, inicia sesión abajo</p>
                            <form onSubmit={handleSubmit(onLoginUser)} noValidate className="animation display-flex column">
                                <input
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: `Es obligatorio`
                                        }
                                    })}
                                    type="text"
                                    className='input mb-small'
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
                                    className='input mb-small'
                                    placeholder='Escribe la contraseña...'
                                />
                                {errors.password && <span className='warning-message'>La contraseña es requerida</span>}

                                <Button
                                    text='Iniciar sesión'
                                    textDisabled='Cargando...'
                                    disabled={loggingIn}
                                    typeSubmit
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
