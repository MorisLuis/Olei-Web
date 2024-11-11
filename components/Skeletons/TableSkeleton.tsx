import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";

const TableSkeleton = () => {
    return (
        <div className={styles.TableSkeleton}>
            <table>
                <thead>
                    <tr>
                        {
                            Array.from({ length: 5 }, (_, i) => (
                                <th key={i} className={styles.Skeleton}>
                                    <p className={styles.skeleton}></p>
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({ length: 20 }, (_, i) => (
                            <tr key={i}>
                                {
                                    Array.from({ length: 5 }, (_, i) => (
                                        <td key={i}>
                                            <p className={styles.skeleton}></p>
                                        </td>
                                    ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableSkeleton;