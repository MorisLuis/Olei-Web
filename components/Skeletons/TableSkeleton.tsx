import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";

const TableSkeleton = () => {
    return (
        <>
            <div className={styles.tableSkeleton}>
                <div  style={{marginBottom:"10px"}}  className={`display-flex space-between`}>
                    <p style={{marginRight:"10px"}} className={styles.skeleton}></p>
                    <p style={{marginRight:"10px"}} className={styles.skeleton}></p>
                    <p style={{marginRight:"10px"}} className={styles.skeleton}></p>
                    <p style={{marginRight:"10px"}} className={styles.skeleton}></p>
                    <p style={{marginRight:"10px"}} className={styles.skeleton}></p>
                    <p style={{marginRight:"0px"}} className={styles.skeleton}></p>
                    <p></p>
                </div>

                <div  >
                    {
                        Array.from({ length: 20 }, (_, i) => <div style={{marginBottom:"10px"}} className={styles.skeleton} key={i}></div>)
                    }
                </div>
            </div>
        </>
    )
}

export default TableSkeleton
