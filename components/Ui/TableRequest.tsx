import React from 'react';
import styles from "../../styles/Tables.module.scss";

import Link from 'next/link';
import { faFileLines, faFilePen, faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from '@/utils/currency';
import OrderInterface from '@/interfaces/order';
import { Tag } from './Tag';

interface Props {
    order: OrderInterface[],
    setOrderSelect: React.Dispatch<React.SetStateAction<OrderInterface | undefined>>
}

const TableRequest = ({ order, setOrderSelect }: Props) => {

    return (
        <>
            <div className={styles.tablesRequest}>
                {
                    order.map((item: OrderInterface, index: number) => (
                        <div key={index} className={`${styles.requestCart} display-flex align space-between cursor`} onClick={() => setOrderSelect(item)}>
                            <div className={`${styles.info}`}>
                                <div className={`${styles.header}`}>
                                    <p><span>Fecha:</span> {item?.Fecha}</p>
                                </div>
                                <div className={styles.data}>
                                    <div className={`display-flex align mb-small`}>
                                        <FontAwesomeIcon icon={faMoneyBill1} className={`icon__small cursor display-flex align m-right`} />
                                        <p><span>Total:</span> {format(item?.Total)}</p>
                                    </div>
                                    <Tag>
                                        {item?.Cantidad} Productos
                                    </Tag>
                                </div>
                            </div>

                            <div className={`${styles.action} display-flex`}>
                                <div className={`${styles.content} display-flex`}>
                                    <Link
                                        href={`/profile/request/?receipt=${item.Folio}`}
                                        as={`/profile/request/?receipt=${item.Folio}`}
                                        className={styles.item}
                                    >
                                        <FontAwesomeIcon icon={faFileLines} className={`icon__small cursor display-flex align`} />
                                    </Link>
                                    <button className={styles.item}>
                                        <FontAwesomeIcon icon={faFilePen} className={`icon__small cursor display-flex align`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default TableRequest