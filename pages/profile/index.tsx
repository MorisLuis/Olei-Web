import LayoutProfile from '@/components/Layouts/LayoutProfile';
import { AuthContext } from '@/context';
import React, { useContext } from 'react'
import styles from "../../styles/Pages/Profile.module.scss";

const Profile = () => {

    const { user } = useContext(AuthContext)

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
                            <label htmlFor="Cuenta">Cuenta</label>
                            <p>{user?.Id_UsuarioOOL}</p>
                        </div>

                        <div className={styles.item}>
                            <label htmlFor="Nombre">Nombre</label>
                            <p>{user?.Nombre}</p>
                        </div>

                        <div className={styles.item}>
                            <label htmlFor="Cliente">Tipo de Cliente</label>
                            <p>{user?.TipoUsuario === 1 ? "Cliente" : "Vendedor"}</p>
                        </div>
                    </div>
                </section>
            </div >
        </LayoutProfile >
    )
}

export default Profile
