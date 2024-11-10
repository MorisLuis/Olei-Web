import { AuthContext } from '@/context';
import React, { useContext } from 'react'
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import TableTertiaryProfile from '@/components/Ui/Tables/TableComponents/TableTertiaryProfile';

const Profile = () => {

    return (
        <LayoutProfile
            titleLP='Cuenta'
            headerContent={{
                title: "Tu cuenta",
                subtitle: "Para cambiar la información, habla con tu administrador."
            }}
        >
            <TableTertiaryProfile />
        </LayoutProfile >
    )
}

export default Profile
