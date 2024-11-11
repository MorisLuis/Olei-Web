import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";
import { ProductSquareCardSkeleton } from './Cards/ProductSquareCardSkeleton';

const GridSkeleton = () => {
    return (
        <div className={styles.gridSkeleton}>
            <div className={styles.content}>
                {
                    Array.from({ length: 20 }, (_, i) =>
                        <ProductSquareCardSkeleton key={i} />
                    )
                }
            </div>
        </div>
    )
}

export default GridSkeleton;
