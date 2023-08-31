import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/Pages/Cart.module.scss";

import { Layout } from '@/components/Layouts/Layout';
import { faCheck, faAngleDoubleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductCardShort } from '@/components/Cards/ProductCardShort';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';
import { format } from '@/utils/currency';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import ProductInterface from '@/interfaces/product';
import { MessageCard } from '@/components/Cards/MessageCard';

const Cart = () => {

    const { push } = useRouter()
    const { cart, cartPending, subTotal, total, tax, numberOfItems, removeAllCart } = useContext(CartContext);
    const [requestOpen, setRequestOpen] = useState(false)
    const [cartShowed, setCartShowed] = useState(cart)
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        setCartShowed(cart)
    }, [cart])

    const submitOrder = () => {

        const productOrdered: ProductInterface[] = cart.map((product: any) => {

            const productDetails: ProductInterface = {
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

                Folio: uuidv4(),
                Fecha: moment().format('YYYY-MM-DD HH:mm:ss'),

                Descripcion: product.Descripcion,
                CodigoProducto: product.CodigoProducto,
                Familia: product.Familia,
                CodigoPrecio: product.CodigoPrecio,
                CodigoExsitencia: product.CodigoExsitencia,
                Existencia: product.Existencia,
                Marca: product.Marca,
            }

            return productDetails
        })

        const existingOrderString = localStorage.getItem('order'); //TEMPORAL
        const existingOrder = existingOrderString ? JSON.parse(existingOrderString) : []; //TEMPORAL
        const ordersArray = Array.isArray(existingOrder) ? existingOrder : [existingOrder]; //TEMPORAL

        const Order = {
            products: productOrdered,
            Cantidad: numberOfItems,
            Subtotal: subTotal,
            Impuesto: tax,
            Total: total,
            Folio: uuidv4(),
            Fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
            Entregado: false
        }

        const updatedOrders = [...ordersArray, Order]; //TEMPORAL

        localStorage.setItem('order', JSON.stringify(updatedOrders));

        if (updatedOrders) {
            removeAllCart()
            push(`/cart/success?order=${Order.Folio}`)
        }

    }

    const searchProductInCart = (term: string) => {
        if (term === "") {
            setCartShowed(cart);
            return;
        }
        const productFiltered = cart.filter((product) => product.Descripcion?.toLowerCase().includes(term.toLowerCase()))

        setCartShowed(productFiltered)
    }

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

                    {
                        cart.length > 0 ?
                            <>
                                <div className={`${styles.search} display-flex space-between`}>
                                    <div className='inputClean display-flex'>
                                        <input type="text" className='input' value={inputValue} placeholder='Buscar producto...' onChange={(e: any) => {
                                            searchProductInCart(e.target.value)
                                            setInputValue(e.target.value)
                                        }} />
                                        {
                                            inputValue !== "" &&
                                            <div className="iconClean display-flex allCenter cursor" onClick={() => {
                                                setInputValue("")
                                                searchProductInCart("")
                                            }}>
                                                <FontAwesomeIcon icon={faXmark} className={`icon__small`} />
                                            </div>
                                        }
                                    </div>
                                </div>

                                <div className={styles.table}>
                                    {
                                        cartShowed.length > 0 ? cartShowed.map((product: ProductInterface, Index) =>
                                            <ProductCardShort product={product} key={Index} />
                                        )
                                            :
                                            <MessageCard title='No hay productos.'>
                                                <p>En tu orden no hay productos con ese nombre.</p>
                                            </MessageCard>
                                    }
                                </div>
                            </>
                            :
                            <div style={{marginBottom: "1em"}}>
                                <MessageCard
                                    title="No has agregado productos aún."
                                    icon="faFileInvoice"
                                >
                                    No hay productos en tu orden, apareceran una vez que agregues productos.
                                </MessageCard>
                            </div>
                    }

                    {
                        cartPending.length > 0 &&
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
                                cartPending.map((product: ProductInterface, Index) =>
                                    <ProductCardShort product={product} key={Index} />
                                )
                            }
                        </div>
                    }


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

                {/* <div className={styles.content}>
                            <MessageCard
                                title="No has agregado productos aún."
                                icon="faFileInvoice"
                            >
                                No hay productos en tu orden, apareceran una vez que agregues productos.
                            </MessageCard>
                        </div> */}


                <div className={styles.footer}>
                    <div className={`${styles.footer__content} display-flex align`}>
                        {
                            cart.length > 0 &&
                            <>
                                <p className={styles.total}>Total (Incluye IVA) : {format(total)} </p>
                                <button className='button display-flex allCenter' onClick={submitOrder}>
                                    <FontAwesomeIcon icon={faCheck} className={`icon__small`} />
                                    Confirmar pedido
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
