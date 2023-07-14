import LayoutProfile from '@/components/Layouts/LayoutProfile';
import React from 'react'
import styles from "../../styles/Pages/Profile.module.scss";

const Profile = () => {

    return (
        <LayoutProfile>
            <div className={styles.account}>
                <section className={styles.info}>
                    <div className={styles.header}>
                        <h2>Tu cuenta</h2>
                        <p>Para cambiar la información, habla con tu administrador.</p>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.item}>
                            <label htmlFor="">Nombre</label>
                            <p>Luis Enrique Morado Campos</p>
                        </div>

                        <div className={styles.item}>
                            <label htmlFor="">Corre electronico</label>
                            <p>moradoluisenrique@gmail.com</p>
                        </div>

                        <div className={styles.item}>
                            <label htmlFor="">Contraseña</label>
                            <p>1234</p>
                        </div>
                    </div>
                </section>
            </div>
        </LayoutProfile>
    )
}

export default Profile
