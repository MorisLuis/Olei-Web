import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";

const GridSkeleton = () => {
    return (
        <>
            <div className={styles.gridSkeleton}>
                <div className={styles.content}>
                    {
                        Array.from({ length: 20 }, (_, i) =>
                            <div className={styles.productSkeleton} key={i}>
                                <div className={styles.image}>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.description}>
                                        <p className={styles.first}></p>
                                        <p className={styles.second}></p>
                                    </div>

                                    <p className={styles.first}></p>
                                    <p className={styles.second}></p>

                                    <div className={styles.counter}>
                                        <p className={styles.price}></p>
                                        <p className={styles.counterNumber}></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default GridSkeleton;
