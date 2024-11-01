import React from 'react';
import styles from '../styles/Tables.module.scss'

export interface ColumnConfig<T> {
    key: keyof T;
    label: string;
    render?: any;
    className?: string;
    width?: string;
}

interface CustomTableProps<T> {
    data: T[];
    columns: ColumnConfig<T>[];
}

const CustomTable = <T,>({ data, columns }: CustomTableProps<T>) => {

    return (
        <div className={styles.tableTest}>
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={col.className || ''}
                                style={{ width: col.width }}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={col.className || ''}
                                        data-label={col.label}
                                        style={{ width: col.width }}
                                    >
                                        {col.render
                                            ? col.render(item[col.key], item)
                                            : (item[col.key] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};


export default CustomTable;
