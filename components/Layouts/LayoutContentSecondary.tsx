import React, { ReactNode } from 'react';
import { Layout } from './Layout';
import styles from "../../styles/Layouts.module.scss";
import ButtonBack from '../Buttons/ButtonBack';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

interface LayoutContentSecondaryInterface {
    children: ReactNode;
    onBack: () => void;
    backText: string;
    footer?: ReactNode;
    topbar?: ReactNode;
    titleLS: string
}

export default function LayoutContentSecondary({
    children,
    onBack,
    backText,
    footer,
    topbar,
    titleLS
}: LayoutContentSecondaryInterface) {
    return (
        <Layout title={titleLS}>
            <div className={styles.LayoutContentSecondary}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <ButtonBack
                            onClick={onBack}
                            text={backText}
                            icon={faArrowLeftLong}
                            color='white'
                        />
                    </div>

                    {topbar && <div className={styles.topbar}>
                        <div className={styles.topbar__contetn}>
                            {topbar}
                        </div>
                    </div>}

                    {children}

                    {footer && <div className={styles.footer}>
                        <div className={styles.footer__content}>
                            {footer}
                        </div>
                    </div>}

                </div>
            </div>
        </Layout>
    )
}
