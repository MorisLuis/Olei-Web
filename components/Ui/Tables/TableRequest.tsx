import React from 'react';
import styles from "../../../styles/Tables.module.scss";

import Link from 'next/link';
import { faFileLines, faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from '@/utils/currency';
import OrderInterface from '@/interfaces/order';
import { Tag } from '../Tag';
import Action from '../Action';
import { dateFormat } from '@/utils/dateFormat';

interface Props {
    order: OrderInterface[],
}
const TableRequest = ({ order }: Props) => {

    return (
        <>
            <div className={styles.tablesRequest}>
                {
                    order.map((item: OrderInterface, index: number) => (
                        <div key={index} className={`${styles.requestCart} display-flex align space-between`}>
                            <div className={`${styles.info}`}>
                                <div className={`${styles.header}`}>
                                    <p><span>Fecha:</span> {dateFormat(item?.Fecha as string)}</p>
                                </div>
                                <div className={`${styles.data}`}>
                                    <div className={`display-flex align`}>
                                        <FontAwesomeIcon icon={faMoneyBill1} className={`icon__small display-flex align m-right`} />
                                        <p><span>Total:</span> {item?.Total && format(item?.Total)}</p>
                                    </div>
                                    <div className={`display-flex align mb-small`}>
                                        <p><span>Folio:</span> {item.Folio}</p>
                                    </div>
                                    <div className={`${styles.tags} display-flex`}>
                                        <Tag color='gray'>
                                            Estatus: En revision
                                        </Tag>
                                        <Tag color='blue'>
                                            {item?.Cantidad} Productos
                                        </Tag>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.action} display-flex`}>
                                <div className={`${styles.content} display-flex`}>
                                    <Link
                                        scroll={false}
                                        shallow
                                        href={`/profile/request/?receipt=${item.Folio}`}
                                        as={`/profile/request/?receipt=${item.Folio}`}
                                    >
                                        <Action textHover='Resumen del pedido'>
                                            <FontAwesomeIcon icon={faFileLines} className={`icon__small cursor display-flex align`} />
                                        </Action>
                                    </Link>
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
