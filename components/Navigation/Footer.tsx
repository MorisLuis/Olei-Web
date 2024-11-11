import Image from 'next/image';
import React from 'react';
import styles from "../../styles/Navigation/Footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.image}>
                <Image
                    src={'/Logo_horizontal.png'}
                    alt="photo"
                    width={200}
                    height={200}
                    priority
                />
            </div>
        </div>
    )
}

export default Footer
