import React from 'react';
import styles from '../../../styles/Tables.module.scss'
import ButtonLoad from '@/components/Buttons/ButtonLoad';

export interface ColumnSecondaryConfig<T> {
    key: keyof T;
    label: string;
    render?: (value: any, item: T) => React.ReactNode;
    className?: string;
    width?: string;
}

interface TableProps<T> {
    data: T[];
    columns: ColumnSecondaryConfig<T>[];
    handleLoadMore?: () => void;
    loadingMoreData: boolean;
    noMoreData: boolean;
    onClick?: (item: T) => void
}

const TableSecondary = <T,>({
    data,
    columns,
    handleLoadMore,
    loadingMoreData,
    noMoreData = false,
    onClick
}: TableProps<T>) => {

    return (
        <div className={styles.tableSecondary}>
            <table>
                <tbody>
                    {
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`${col.className || ''}`}
                                        data-label={col.label}
                                        style={{ width: col.width }}
                                        onClick={() => onClick?.(item)}
                                    >
                                        <div className={styles.column}>
                                            {col.render
                                                ? col.render(item[col.key], item)
                                                : (item[col.key] as React.ReactNode)}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                (!noMoreData && handleLoadMore) &&
                <div className={styles.loadMore}>
                    <ButtonLoad
                        buttonText='Ver más'
                        onClick={handleLoadMore}
                        loading={loadingMoreData}
                    />
                </div>
            }

            {
                (!noMoreData && handleLoadMore) &&
                <p className={styles.message}>Ya no hay más productos, cambia los filtros para ver otros resultados</p>
            }
        </div>
    );
};

export default TableSecondary;
