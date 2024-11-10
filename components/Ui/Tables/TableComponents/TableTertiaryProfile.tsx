import React, { useContext } from 'react';
import TableTertiary, { ColumnTertiaryConfig } from '../TableTertiary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUser, faAddressCard, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../../styles/Pages/Profile.module.scss'
import { AuthContext } from '@/context';

interface ProfileInterface {
    nombre: string;
    tipoUsuario: string;
    cuenta: string;
}

export default function TableTertiaryProfile() {

    const { user } = useContext(AuthContext)
    const profiledata: ProfileInterface = { 
        nombre: user.Nombre, 
        tipoUsuario: user?.TipoUsuario === 1 ? "Cliente" : "Vendedor", 
        cuenta: user.Id_UsuarioOOL ? user.Id_UsuarioOOL : "No especificado"
    };

    const columns: ColumnTertiaryConfig<ProfileInterface>[] = [
        {
            key: 'nombre',
            label: 'Nombre',
            renderLabel: (_: string, item: ProfileInterface) => (
                <div className={styles.account__item}>
                    <FontAwesomeIcon icon={faUser} className="icon__small" />
                    <p>Nombre</p>
                </div>
            )
        },
        {
            key: 'tipoUsuario',
            label: 'Tipo de usuario',
            renderLabel: (_: string, item: ProfileInterface) => (
                <div className={styles.account__item}>
                    <FontAwesomeIcon icon={faAddressCard} className="icon__small" />
                    <p>Tipo de usuario</p>
                </div>
            )
        },
        {
            key: 'cuenta',
            label: 'Cuenta',
            renderLabel: (_: string, item: ProfileInterface) => (
                <div className={styles.account__item}>
                    <FontAwesomeIcon icon={faAddressCard} className="icon__small" />
                    <p>Cuenta</p>
                </div>
            )
        },
    ];

    return (
        <TableTertiary
            data={profiledata}
            columns={columns}
        />
    );
}
