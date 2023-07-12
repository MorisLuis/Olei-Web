import React from 'react'
import { Tag } from './Tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/UI.module.scss"

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
                <p>Precio (MNX)</p>
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
                                            <p className='text-ellipsis'>{item.Codigo}</p>
                                        </div>
                                        <div>
                                            {
                                                item.Precio ?
                                                    <p>${item.Precio}</p> :
                                                    <Tag color="green">No tiene precio</Tag>
                                            }
                                        </div>

                                        <div>
                                            <p>{item.Nombre}</p>
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

                                    <div className={`${styles.counter} display-flex space-between`}>
                                        <span className={`${styles.action} cursor display-flex align`} >
                                            <FontAwesomeIcon icon={faMinus} className={`icon__small`} />
                                        </span>
                                        <span className={`${styles.number} display-flex allCenter`}>
                                            0
                                        </span>
                                        <span className={`${styles.action} cursor display-flex align`} >
                                            <FontAwesomeIcon icon={faPlus} className={`icon__small`} />
                                        </span>
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
