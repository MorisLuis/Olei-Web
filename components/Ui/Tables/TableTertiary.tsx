import React from 'react';
import styles from '../../../styles/Tables.module.scss';

export interface ColumnTertiaryConfig<T> {
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
    renderLabel?: (value: T[keyof T], item: T) => React.ReactNode;
    className?: string;
    width?: string;
}

interface TableProps<T> {
    data: T; // Modificado para aceptar un solo objeto
    columns: ColumnTertiaryConfig<T>[];
    onClick?: (item: T) => void;
}

const TableTertiary = <T,>({
    data,
    columns,
    onClick,
}: TableProps<T>) => {
    return (
        <div className={styles.tableTertiary}>
            {columns.map((col, colIndex) => (
                <div
                    key={colIndex}
                    className={styles.item}
                    data-label={col.label}
                >
                    <div className={styles.item__label}>{
                        col.renderLabel
                            ? col.renderLabel(data[col.key], data)
                            : String(data[col.key])
                    }</div>
                    <div className={styles.column}>
                        {col.render
                            ? col.render(data[col.key], data)
                            : String(data[col.key])}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TableTertiary;
