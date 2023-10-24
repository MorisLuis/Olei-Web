import Image from 'next/image';
import React from 'react';
import styles from "../../styles/Navigation/Footer.module.scss";

const Footer = () => {
    return (
        <div className={`${styles.footer} display-flex align`}>
            <div className={styles.image}>
                <Image
                    src={'/logo02.png'}
                    alt="photo"
                    width={200}
                    height={200}
                />
            </div>
        </div>
    )
}

export default Footer
