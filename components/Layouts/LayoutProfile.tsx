import React, { ReactNode } from 'react'
import NavigationProfile from '../Navigation/NavigationProfile'
import LayoutContentSecondary from './LayoutContentSecondary';
import { useRouter } from 'next/router';
import styles from '../../styles/Layouts.module.scss'

type headerContent = {
    title: string;
    subtitle: string
}

interface Props {
    children: ReactNode;
    headerContent?: headerContent;
    titleLP: string
}

const LayoutProfile = ({ children, headerContent, titleLP }: Props) => {

    const { push } = useRouter()

    return (
        <LayoutContentSecondary
            onBack={() => push('/products')}
            backText='Regresar'
            titleLS={`Perfil > ${titleLP}`}
        >
            <NavigationProfile />

            <div className={styles.LayoutProfile}>
                {
                    headerContent &&
                    <div className={styles.header}>
                        <h2>{headerContent.title}</h2>
                        <p>{headerContent.subtitle}</p>
                    </div>
                }
                {children}
            </div>

        </LayoutContentSecondary>
    )
}



export default LayoutProfile
