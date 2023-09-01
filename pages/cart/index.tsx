import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/Pages/Cart.module.scss";

import { Layout } from '@/components/Layouts/Layout';
import { faCheck, faAngleDoubleDown, faXmark, faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductCardShort } from '@/components/Cards/ProductCardShort';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';
import { format } from '@/utils/currency';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import ProductInterface from '@/interfaces/product';
import { MessageCard } from '@/components/Cards/MessageCard';
import ToggleSwitch from '@/components/Inputs/toggleSwitch';
import { useSpring, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'

const Cart = () => {

    const { push } = useRouter()
    const { cart, cartPending, subTotal, total, tax, numberOfItems, removeAllCart, numberOfItemsPending, subTotalPending, totalPending } = useContext(CartContext);
    const [requestOpen, setRequestOpen] = useState(false)
    const [requestCartPending, setRequestCartPending] = useState(true)
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

        console.log({ existingOrder })
        console.log({ ordersArray })
        console.log({ Order })
        const updatedOrders = [...ordersArray, Order]; //TEMPORAL

        localStorage.setItem('order', JSON.stringify(updatedOrders));

        if (requestCartPending && cartPending.length > 0) {
            console.log("cartPending")
            const productPendingOrdered: ProductInterface[] = cartPending.map((product: any) => {

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

            const existingOrderPendingString = localStorage.getItem('orderPending'); //TEMPORAL
            const existingOrderPending = existingOrderPendingString ? JSON.parse(existingOrderPendingString) : []; //TEMPORAL
            const ordersPendingArray = Array.isArray(existingOrderPending) ? existingOrderPending : [existingOrderPending]; //TEMPORAL

            const OrderPending = {
                products: productPendingOrdered,
                Cantidad: numberOfItemsPending,
                Subtotal: subTotalPending,
                Impuesto: tax,
                Total: totalPending,
                Folio: uuidv4(),
                Fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
                Entregado: false
            }

            const updatedOrdersPending = [...ordersPendingArray, OrderPending]; //TEMPORAL

            localStorage.setItem('orderPending', JSON.stringify(updatedOrdersPending));
        }


        if (updatedOrders) {
            push(`/cart/success?order=${Order.Folio}`)
            removeAllCart()
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

    const [open, toggle] = useState(false);
    const [text, setText] = useState('Confirmar pedido');
    const [ref, { width }] = useMeasure();
    const [animationComplete, setAnimationComplete] = useState(false);

    const props = useSpring({
        width: open ? width : 0,
        onRest: () => {
            if (!animationComplete) {
                submitOrder();
                setAnimationComplete(true);
            }
        },
    });


    const handleClick = () => {
        toggle(!open);
        setText(open ? 'Confirmar pedido' : 'Enviando...');
    };


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
                    <div className={`${styles.orderConfig} display-flex align space-between`}>
                        <p>
                            <span>Solicitar productos inexistentes.</span> En la orden enviar solicitud de los productos actualmente inexistentes.
                        </p>
                        <ToggleSwitch
                            value={requestCartPending}
                            onChange={() => setRequestCartPending(false)}
                        />
                    </div>

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
                            <div style={{ marginBottom: "1em" }}>
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
                        <>

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
                                        <ProductCardShort product={product} key={Index} productPending />
                                    )
                                }
                            </div>

                        </>
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

                <div className={styles.footer}>
                    <div className={`${styles.footer__content} display-flex align`}>
                        {
                            cart.length > 0 &&
                            <>
                                <p className={styles.total}>Total (Incluye IVA) : {format(total)} </p>
                                <div className={`${styles.buttonConfirm} containerbutton`}>
                                    <div ref={ref} className={"mainbutton"} onClick={handleClick}>
                                        <animated.div className={"fillbutton"} style={props} />
                                        <animated.div className={"contentbutton"}>{text}</animated.div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
