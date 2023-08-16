import React from 'react';
import styles from "../../styles/Components/Cards.module.scss";

import Link from 'next/link';
import { faFileLines, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from '@/utils/currency';
import OrderInterface from '../../interfaces/Order';

interface Props {
    order: OrderInterface[],
    setOrderSelect: React.Dispatch<React.SetStateAction<OrderInterface | undefined>>
}

const RequestCard = ({ order, setOrderSelect}: Props) => {

    return (
        <>
            {
                order.map((item: OrderInterface, index: number) => (
                    <div key={index} className={styles.requestCart} onClick={() => setOrderSelect(item)}>
                        <div className={styles.info}>
                            <div className={styles.header}>
                                <p><span>Fecha:</span> {item?.Fecha}</p>
                            </div>
                            <div className={styles.data}>
                                <p><span>Total:</span> {format(item?.Total)}</p>
                                <p><span>Productos:</span> {item?.Cantidad}</p>
                            </div>
                        </div>

                        <div className={`${styles.action} display-flex`}>
                            <div className={`${styles.content} display-flex`}>
                                <Link
                                    href={`/profile/request/?receipt=${item.Folio}`}
                                    as={`/profile/request/?receipt=${item.Folio}`}
                                    className='button-small black display-flex align'
                                >
                                    Ver recibo
                                    <FontAwesomeIcon icon={faFileLines} className={`icon__small cursor display-flex align`} />
                                </Link>
                                <button className='button-small black display-flex align'>
                                    Modificar
                                    <FontAwesomeIcon icon={faFilePen} className={`icon__small cursor display-flex align`} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default RequestCard
