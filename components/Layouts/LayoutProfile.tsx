import React, { ReactNode } from 'react'
import NavigationProfile from '../Navigation/NavigationProfile'
import LayoutContentSecondary from './LayoutContentSecondary';
import { useRouter } from 'next/router';
import styles  from '../../styles/Layouts.module.scss'

interface Props {
    children: ReactNode
}

const LayoutProfile = ({ children }: Props) => {

    const { push } = useRouter()

    return (
        <LayoutContentSecondary
            onBack={() => push('/products')}
            backText='Regresar'
        >
            <NavigationProfile />

            <div className={styles.layoutProfile}>
                {children}
            </div>
        </LayoutContentSecondary>
    )
}

export default LayoutProfile
