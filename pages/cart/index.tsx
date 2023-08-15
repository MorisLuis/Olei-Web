import React, { useContext, useState } from 'react';
import { Layout } from '@/components/Layouts/Layout';
import { faCheck, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductCardShort } from '@/components/Cards/ProductCardShort';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';
import { ProductCartInterface } from '@/interfaces/productCart';
import { format } from '@/utils/currency';
import ProductOrderInterface from '@/interfaces/productOrder';
import moment from "moment";

import styles from "../../styles/Pages/Cart.module.scss";
import Cookies from 'js-cookie';

const Cart = () => {

    const { push } = useRouter()
    const { cart, subTotal, total, tax, numberOfItems, removeCartProduct } = useContext(CartContext);
    const [requestOpen, setRequestOpen] = useState(false)

    const submitOrder = () => {

        const productOrdered: ProductOrderInterface[] = cart.map((product: any) => {

            const productDetails: ProductOrderInterface = {
                Precio: product.Precio,
                Cantidad: product.Cantidad,
                Subtotal: product.Cantidad && (product.Precio * product.Cantidad),
                Impuesto: tax,
                Total: product.Cantidad && (product.Precio * product.Cantidad) * (tax),

                Id_Almacen: product?.Id_Almacen,
                Id_Marca: product?.Id_Marca,
                Id_ListaPrecios: product?.Id_ListaPrecios,
                Id_Vendedor: 1,
                Id_Cliente: 1,
                Id_Formapago: "Efectivo",

                Folio: 1,
                Fecha: moment().format('YYYY-MM-DD HH:mm:ss')
            }

            return productDetails
        })

        const Order = {
            products: productOrdered,
            Cantidad: numberOfItems,
            Subtotal: subTotal,
            Impuesto: tax,
            Total: total,
            Folio: 1,
            Fecha: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        Cookies.set('order', JSON.stringify(Order));
        Cookies.remove('cart');
        push("/cart/success")
    }

    const productsExistent = cart.filter((product) => product.Existencia && product.Existencia > 0)
    const productNoStock = cart.filter((product) => product.Existencia && product.Existencia < 0)

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
                            productsExistent.map((product: ProductCartInterface, Index) =>
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

                        {
                            requestOpen &&
                            productNoStock.slice(0, 2).map((product: ProductCartInterface, Index) =>
                                <ProductCardShort product={product} key={Index} />
                            )
                        }
                    </div>

                    <div className='divider'></div>

                    <div className={`${styles.cost} display-flex column`}>
                        <div className={styles.cost__data}>
                            <p> <span>Subtotal:</span> {format(subTotal)}</p>
                        </div>
                        <div className={styles.cost__data}>
                            <p><span>I.V.A:</span> {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%</p>
                        </div>
                        <div className={styles.cost__data}>
                            <p> <span>Total:</span> {format(total)}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={`${styles.footer__content} display-flex align`}>
                        <p className={styles.total}>Total (Incluye IVA) : {format(total)} </p>
                        <button className='button display-flex allCenter' onClick={submitOrder}>
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
