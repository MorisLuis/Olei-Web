import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";

export default function ReceiptRenderSkeleton() {
    return (
        <div className={styles.ReceiptRenderSkeleton}>
            <div className={styles.brief}>
                <h4></h4>
                <div className={`${styles.details}`}>
                    <div className={`${styles.date} display-flex column`}>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                    </div>

                    <div className={`${styles.price} display-flex column`}>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                    </div>
                </div>
            </div>

            <div className={styles.productsDetails}>
                {
                    Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className={`${styles.productCard}`}>
                            <div className={`${styles.content} display-flex space-between`}>
                                <div className={styles.productDescription}>
                                    <div className={styles.item}></div>
                                    <div className={styles.item}></div>
                                    <div className={styles.item}></div>
                                    <div className={`divider__small ${styles.divider}`}></div>
                                </div>

                                <div className={styles.productData}>
                                    <div className={styles.item}></div>
                                    <div className={styles.item}></div>
                                    <div className={`divider__small ${styles.divider}`}></div>
                                </div>

                                <div className={styles.productCounter}>
                                    <div className={styles.item}></div>
                                    <div className={styles.item}></div>
                                    <div className={styles.item}></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
