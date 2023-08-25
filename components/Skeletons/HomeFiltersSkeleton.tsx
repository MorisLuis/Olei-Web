import React from 'react'
import styles from "../../styles/Components/Skeleton.module.scss";

const HomeFiltersSkeleton = () => {
    return (
        <>
            <h1 className={styles.nameFilter}></h1>
            <div className={`${styles.filters} display-flex`}>

                <div className={styles.buttonFilter}>
                    <button className={`button-small white display-flex align`}>
                        <p></p>
                    </button>
                    <div className={`${styles.filtersCount}`}>
                        <p className={`display-flex allCenter`}></p>
                    </div>
                </div>

                <>
                    {
                        Array.from({ length: 2 }, (_, i) => (
                            <div key={i}>
                            </div>
                        ))
                    }
                </>
            </div>
        </>
    )
}

export default HomeFiltersSkeleton
