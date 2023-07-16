import React from 'react'
import { Tag } from './Tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/UI.module.scss"
import Counter from './Counter';

interface Props {
    data: any
}

const Table = ({
    data
}: Props) => {
    return (
        <div className={`${styles.table}`}>
            <div className={`${styles.headers} display-flex space-between`}>
                <p>Nombre</p>
                <p>Codigo</p>
                <p>Precio (MXN)</p>
                <p>Familia</p>
                <p>Existencia</p>
                <p></p>
            </div>

            <div className={styles.content}>
                {
                    data.slice(50, 100).map((item: any, index: number) => {
                        return (
                            <div className={`${styles.item} cursor display-flex`} key={index}>
                                <div className={styles.principalData}>
                                    <div>
                                        <p>{item.Descripcion}</p>
                                    </div>
                                </div>

                                <div className={`${styles.secondaryData} display-flex space-between`}>
                                    <div className={`${styles.notCounter} display-flex space-between allCenter`}>
                                        <div>
                                            <p className='text-ellipsis display-flex align'>{item.CodigoProducto}</p>
                                        </div>
                                        <div className={styles.price}>
                                            {
                                                item.Precio ?
                                                    <p>${item.Precio}</p> :
                                                    <Tag color="blue">No tiene precio</Tag>
                                            }
                                        </div>

                                        <div>
                                            <p>{item.Familia}</p>
                                        </div>

                                        <div>
                                            {
                                                item.Existencia <= 0 ?
                                                    <Tag color="red">No Stock</Tag> :
                                                    <div className='display-flex'>
                                                        <p className={styles.headersMovil}>Existencia: </p>
                                                        <p>{item.Existencia}</p>
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <div className={`${styles.counterColumn} display-flex`}>
                                        <Counter/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Table
