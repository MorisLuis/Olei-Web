import React from 'react'
import NavigationProfile from '../Navigation/NavigationProfile'
import { Layout } from './Layout'
import styles from "./../../styles/Layouts.module.scss";

interface Props {
    children: any
}

const LayoutProfile = ({ children }: Props) => {

    return (
        <Layout>

            <NavigationProfile />
            <div className={styles.layoutProfile}>
                {children}
            </div>
        </Layout>
    )
}

export default LayoutProfile
