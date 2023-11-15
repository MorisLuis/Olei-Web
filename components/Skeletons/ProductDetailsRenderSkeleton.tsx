import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";

export const ProductDetailsRenderSkeleton = () => {
    return (
        <div className={styles.ProductDetailsRenderSkeleton}>

            <div className={styles.imageGallery}>
                <div className={styles.primary}>
                    <span className={styles.photo}></span>
                </div>
                <div className={styles.gallery}>
                    <span className={styles.photo}></span>
                    <span className={styles.photo}></span>
                    <span className={styles.photo}></span>
                </div>
            </div>

            <div className={styles.content}>

                <div className={styles.header}>
                    <span className={styles.title}></span>
                    <span className={styles.price}></span>
                    <span className={styles.price}></span>
                </div>

                <span className={styles.observations}>
                </span>

                <span className={styles.details}>
                </span>

                <section className={styles.counter}>
                    <span className={styles.number}></span>
                </section>
            </div>
        </div>
    )
}
