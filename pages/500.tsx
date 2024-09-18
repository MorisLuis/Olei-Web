import { Layout } from '@/components/Layouts/Layout'
import React from 'react'
import { motion } from 'framer-motion';
import styles from './../styles/Pages/NotFound.module.scss';
import { useRouter } from 'next/router';

const Custum404 = () => {

    const { push } = useRouter();

    return (
        <Layout>
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
                        500
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className={styles.message}
                    >
                        Lo sentimos, hubo un error en el servidor intentalo más tarde. 😞

                        <button className='button-small' onClick={() => push('/products')}>
                            Volver al inicio
                        </button>

                    </motion.p>
                </motion.div>
            </div>
        </Layout>
    );
}

export default Custum404;