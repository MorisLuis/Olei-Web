import { useContext, useEffect, useState } from 'react';
import styles from "../styles/Pages/Login.module.scss";

import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LayoutOnboarding } from '@/components/Layouts/LayoutOnboarding';
import Image from 'next/image';
import PageTransition from '@/components/PageTranstion';


type FormData = {
    email: string;
    password: string;
};

const Login = () => {

    const { loginUser, loggingIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isEntering, setIsEntering] = useState(true);

    const onLoginUser = async ({ email, password }: FormData) => {
        try {
            await loginUser(email, password);
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
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
                                {errors.email && <span className='warning'>La cuenta es requerida</span>}

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
                                {errors.password && <span className='warning'>La contraseña es requerida</span>}
                                <button disabled={loggingIn} className='button' type="submit">{loggingIn ? "Cargando..." : "Iniciar sesión"}</button>
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
