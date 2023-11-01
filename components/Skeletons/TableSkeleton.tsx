import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";

const TableSkeleton = () => {
    return (
        <>
            <div className={styles.tableSkeleton}>
                <div style={{ marginBottom: "10px" }} className={`${styles.header} display-flex space-between`}>
                    <p style={{ marginRight: "10px" }} className={styles.productSkeleton}></p>
                    <p style={{ marginRight: "10px" }} className={styles.productSkeleton}></p>
                    <p style={{ marginRight: "10px" }} className={styles.productSkeleton}></p>
                    <p style={{ marginRight: "10px" }} className={styles.productSkeleton}></p>
                    <p style={{ marginRight: "10px" }} className={styles.productSkeleton}></p>
                    <p style={{ marginRight: "0px" }} className={styles.productSkeleton}></p>
                    <p></p>
                </div>

                <div>
                    {
                        Array.from({ length: 20 }, (_, i) =>
                            <div className={styles.productSkeleton} key={i}>
                                <div className={styles.top}>
                                    <div className={styles.title}></div>
                                    <div className={styles.code}></div>
                                    <div className={styles.code}></div>
                                    <div className={styles.code}></div>
                                </div>
                                <div className={styles.bottom}>
                                    <div className={styles.price}></div>
                                    <div className={styles.counter}></div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default TableSkeleton
