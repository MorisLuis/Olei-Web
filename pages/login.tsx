import { useContext } from 'react';
import styles from "../styles/Pages/Login.module.scss";

import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LayoutOnboarding } from '@/components/Layouts/LayoutOnboarding';
import Image from 'next/image';


type FormData = {
    email: string;
    password: string;
};

const Login = () => {

    const { loginUser, loggingIn } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = async ({ email, password }: FormData) => {
        try {
            await loginUser(email, password);
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (

        <LayoutOnboarding>
            <div className={`${styles.login}`}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <Image
                            src={"/logoCircle.svg" || ""}
                            alt="photo"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
                <div className={`${styles.content} display-flex allCenter`}>
                    {/*  <Image
                        src={"/logoCircle.svg" || ""}
                        alt="photo"
                        width={200}
                        height={200}
                    /> */}
                    <div className={`${styles.form} display-flex column justify`}>

                        <div className={`${styles.iconLogin} mb-small display-flex allCenter`}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} className={`icon`} />
                        </div>

                        <h1>Bienvenido!</h1>
                        <p className='mb-medium'>Por favor, inicia sesión abajo.</p>
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
                {/* <div className={styles.lineBlue}></div>
                <div className={styles.lineYellow}></div> */}
            </div>
        </LayoutOnboarding>

    );
};

export default Login;
