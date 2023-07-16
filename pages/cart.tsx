import { Layout } from '@/components/Layouts/Layout';
import React, { useState } from 'react';
import { faCheck, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Counter from '@/components/Ui/Counter';

import styles from "../styles/Pages/Cart.module.scss";
import { productsUtils } from '@/utils/products';
import PorductInterface from '@/interfaces/product';
import { ProductCard } from '@/components/Cards/ProductCard';

const Cart = () => {

    const [requestOpen, setRequestOpen] = useState(false)

    return (
        <Layout>
            <div className={styles.cart}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Compra</h1>
                        <p className={styles.paragraph}>Revisa el pedido y despues confirma.</p>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={`${styles.search} display-flex space-between`}>
                        <input type="text" className='input' placeholder='Buscar producto...' />
                        <button className='button'>Buscar</button>
                    </div>

                    <div className={styles.table}>
                        {
                            productsUtils.map((product: PorductInterface, Index) =>
                                <ProductCard product={product} key={Index} />
                            )
                        }
                    </div>

                    <div className={styles.request}>
                        <div className={`${styles.handleRequest} cursor`} onClick={() => setRequestOpen(!requestOpen)}>
                            <div className={`${styles.content} display-flex space-between align`}>
                                <p className={styles.text}>
                                    Ver peticiones de productos actualmente inexistentes
                                </p>
                                <FontAwesomeIcon icon={faAngleDoubleDown} className={requestOpen ? `icon__small rotate180` : `icon__small`} />
                            </div>
                        </div>

                        {
                            requestOpen &&
                            <div className={`${styles.info} cursor`}>
                                <div className={`${styles.item} display-flex space-between`}>
                                    <div className={styles.name}>
                                        <p className={styles.title}>BALERO DOBLE ESCAPE,MARINER</p>
                                        <p className={styles.code}>0069 0069 0069</p>
                                    </div>

                                    <div className={styles.data}>
                                        <p className={styles.price}>Precio: $450</p>
                                        <p className={styles.existen}>Existencia : 10</p>
                                    </div>

                                    <div className={styles.counter}>
                                        <Counter />
                                        <p className={styles.subtotal}>Subtotal : $2,000</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='divider'></div>

                    <div className={`${styles.cost} display-flex column`}>
                        <div className={styles.cost__data}>
                            <p> <span>Subtotal:</span> $19,000 MXN</p>
                        </div>
                        <div className={styles.cost__data}>
                            <p><span>I.V.A:</span> 15%</p>
                        </div>
                        <div className={styles.cost__data}>
                            <p> <span>Total:</span> 21,200 MXN</p>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={`${styles.footer__content} display-flex align`}>
                        <p className={styles.total}>Total (Incluye IVA) : $21,200 MXN </p>
                        <button className='button display-flex allCenter'>
                            <FontAwesomeIcon icon={faCheck} className={`icon__small`} />
                            Confirmar pedido
                        </button>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Cart
