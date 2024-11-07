import React from 'react';
import styles from "../../styles/Components/Skeleton.module.scss";

interface TableSecondarySkeletonInterface {
    body: number[]
}

export const TableSecondarySkeleton = ({ body }: TableSecondarySkeletonInterface) => {
    return (
        <div className={styles.TableSecondarySkeleton}>
            <table>
                <tbody>
                    {Array.from({ length: 20 }, (_, rowIndex) => (
                        <tr key={rowIndex}>
                            {body.map((length, colIndex) => (
                                <React.Fragment key={colIndex}>
                                    <td className={styles.web}>
                                        {Array.from({ length }, (_, i) => (
                                            <p key={i} className={styles.skeleton}></p>
                                        ))}
                                    </td>
                                    <td className={styles.mobil}>
                                        {Array.from({ length: 1 }, (_, i) => (
                                            <p key={i} className={styles.skeleton}></p>
                                        ))}
                                    </td>
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
