import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";

export const TableRequestSkeleton = () => {
    return (
        <>
            <div className={styles.tablesRequestSkeleton}>
                <div className={styles.titles}>
                    <h2></h2>
                    <p></p>
                </div>
                <div className={styles.content}>
                {
                    Array.from({ length: 20 }, (_, i) => (
                        <div key={i} className={`${styles.requestCart} display-flex space-between cursor`}>
                            <div className={`${styles.info}`}>
                                <div className={`${styles.header}`}>
                                </div>
                                <div className={`${styles.data}`}>
                                    <div className={`${styles.total} display-flex align mb-small`}></div>
                                    <div className={`${styles.tags} display-flex row`}>
                                        <div className={styles.status}></div>
                                        <div className={styles.status}></div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.actions} display-flex`}>
                                <div className={`${styles.contentActions} display-flex`}>
                                    <div className={styles.action}>
                                    </div>
                                    <div className={styles.action}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </>
    )
}
