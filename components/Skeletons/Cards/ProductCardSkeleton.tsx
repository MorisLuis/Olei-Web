import React from 'react';
import styles from "../../../styles/Components/Skeleton.module.scss";


const ProductCardSkeleton = () => {

    return (
        <div className={styles.ProductCardSkeleton}>
            <div className={styles.productInfo}>
                <div className={styles.data}>
                    <p className={styles.skeleton}></p>
                    <p className={styles.skeleton}></p>
                    <p className={styles.skeleton}></p>
                </div>

                <div className={styles.counter}>
                    <p className={styles.skeleton}></p>
                </div>
            </div>
        </div>
    );
}

export default ProductCardSkeleton;
