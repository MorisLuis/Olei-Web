import { Layout } from '@/components/Layouts/Layout'
import React from 'react'
import { motion } from 'framer-motion';
import styles from './../styles/Pages/NotFound.module.scss';
import { useRouter } from 'next/router';
import ButtonSmall from '@/components/Buttons/ButtonSmall';
import Cookies from 'js-cookie';

const Custum404 = () => {

    const { replace } = useRouter();


    const handleNavigate = () => {
        const token = Cookies.get('token');

        console.log({token})
        if (!token) {
            replace('/login')
        } else {
            replace('/products')
        }
    }



    return (
        <Layout title='404'>
            <div className={styles.NotFound}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                >
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className={styles.title}
                    >
                        404
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className={styles.message}
                    >
                        Lo sentimos, la página que buscas no existe o hubo un problema con el servidor. 😞
                        <ButtonSmall
                            text='Volver'
                            onClick={handleNavigate}
                        />
                    </motion.p>
                </motion.div>
            </div>
        </Layout>
    );
}

export default Custum404;