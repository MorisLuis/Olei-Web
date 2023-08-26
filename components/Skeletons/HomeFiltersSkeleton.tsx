import React from 'react'
import styles from "../../styles/Components/Skeleton.module.scss";

const HomeFiltersSkeleton = () => {
    return (
        <div className={styles.homeFiltersSkeleton}>
            <h1 className={styles.skeleton}></h1>
            <div className='display-flex '>
                <div className={`${styles.buttonFilter} ${styles.skeleton}`}>
                </div>

                <>
                    {
                        Array.from({ length: 2 }, (_, i) => (
                            <div className={`${styles.buttonFilter} ${styles.skeleton}`} key={i}>
                            </div>
                        ))
                    }
                </>
            </div>
        </div>
    )
}

export default HomeFiltersSkeleton
