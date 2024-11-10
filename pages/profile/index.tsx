import { AuthContext } from '@/context';
import React, { useContext } from 'react'
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import TableTertiaryProfile from '@/components/Ui/Tables/TableComponents/TableTertiaryProfile';

const Profile = () => {

    return (
        <LayoutProfile
            headerContent={{
                title: "Tu cuenta",
                subtitle: "Para cambiar la información, habla con tu administrador."
            }}
        >
            <TableTertiaryProfile/>
        </LayoutProfile >
    )
}

export default Profile


/* 
                <div className={styles.account}>
                <section className={styles.info}>
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
*/