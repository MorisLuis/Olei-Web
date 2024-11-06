import React from 'react';
import styles from "../../../styles/Components/Skeleton.module.scss";

export const ProductSquareCardSkeleton = () => {

    return (
        <div className={styles.ProductSquareCardSkeleton}>
            <div className={styles.ProductSquareCardSkeleton__content}>
                <div className={styles.image}>
                </div>

                <div className={styles.info}>
                    <div className={styles.description}>
                        <h4 className={styles.skeleton}></h4>
                        <span className={styles.skeleton}></span>
                    </div>

                    <div className={styles.data}>
                        <p className={styles.skeleton}></p>
                        <p className={styles.skeleton}></p>
                    </div>

                    <div className={styles.counter}>
                        <p className={styles.skeleton}></p>
                        <span className={styles.skeleton}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
