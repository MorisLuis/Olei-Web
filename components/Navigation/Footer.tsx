import React from 'react';
import styles from "../../styles/Navigation/Footer.module.scss";

const Footer = () => {
    return (
        <div className={`${styles.footer} display-flex align`}>
            <p>Desarrollado por : <span>Olei</span></p>
        </div>
    )
}

export default Footer
