import { Layout } from '@/components/Layouts/Layout';
import React, { useContext, useState } from 'react';
import { faCheck, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PorductInterface from '@/interfaces/product';
import { ProductCardShort } from '@/components/Cards/ProductCardShort';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';
import { ProductCartInterface } from '@/interfaces/productCart';

import styles from "../../styles/Pages/Cart.module.scss";

const Cart = () => {

    const [requestOpen, setRequestOpen] = useState(false)
    const { push } = useRouter()

    const { cart, numberOfItems, subTotal, total } = useContext(CartContext);

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
                            cart.map((product: ProductCartInterface, Index) =>
                                <ProductCardShort product={product} key={Index} />
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

                        {/* {
                            requestOpen &&
                            
                            productsUtils.slice(0,2).map((product: PorductInterface, Index) =>
                                <ProductCardShort product={product} key={Index} />
                            )
                            
                        } */}
                    </div>

                    <div className='divider'></div>

                    <div className={`${styles.cost} display-flex column`}>
                        <div className={styles.cost__data}>
                            <p> <span>Subtotal:</span> {subTotal}</p>
                        </div>
                        <div className={styles.cost__data}>
                            <p><span>I.V.A:</span> {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%</p>
                        </div>
                        <div className={styles.cost__data}>
                            <p> <span>Total:</span> {total}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={`${styles.footer__content} display-flex align`}>
                        <p className={styles.total}>Total (Incluye IVA) : $21,200 MXN </p>
                        <button className='button display-flex allCenter' onClick={() => push("/cart/success")}>
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
