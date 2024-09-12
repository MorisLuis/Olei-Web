import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";

const LabelInputSkeleton = () => {
    return (
        <div className={styles.LabelInputSkeleton}>
            <div className={styles.label}>
            </div>
            <div className={styles.input}>
            </div>
        </div>
    )
}

export default LabelInputSkeleton;
