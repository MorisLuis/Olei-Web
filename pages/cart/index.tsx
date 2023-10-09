import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/Pages/Cart.module.scss";

import { Layout } from '@/components/Layouts/Layout';
import { faArrowLeftLong, faAngleDoubleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductCardShort } from '@/components/Cards/ProductCardShort';
import { useRouter } from 'next/router';
import { AuthContext, CartContext } from '@/context';
import { format } from '@/utils/currency';

import ProductInterface from '@/interfaces/product';
import { MessageCard } from '@/components/Cards/MessageCard';
import ToggleSwitch from '@/components/Inputs/toggleSwitch';
import { useSpring, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { api } from '@/api/api';
import OrderInterface from '@/interfaces/order';

const Cart = () => {

    const { push } = useRouter()
    const { cart, cartPending, total, numberOfItems, removeAllCart, subTotal } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const [requestOpen, setRequestOpen] = useState(false)
    const [requestCartPending, setRequestCartPending] = useState(true)
    const [cartShowed, setCartShowed] = useState(cart)
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        setCartShowed(cart)
    }, [cart])

    const submitOrder = async () => {

        const order: OrderInterface = {
            Total: total,
            Piezas: numberOfItems,
            Subtotal: subTotal
        }

        const productOrdered: ProductInterface[] = cart.map((product: ProductInterface) => {

            const productDetails: ProductInterface = {
                Codigo: product.Codigo,
                Id_Marca: product?.Id_Marca,
                Piezas: product.Piezas,
                Precio: product.Precio,
                Impto: product.Impto,
                Descripcion: product.Descripcion,
                Existencia: product?.Existencia,
            }

            return productDetails
        })

        let newOrder;

        try {
            await api.post('/api/orderDetails', productOrdered);
        } catch (error) {
            console.log({ error })
        }

        try {
            newOrder = await api.post('/api/order', order)
        } catch (error) {
            console.log({ error })
        }

        if (newOrder) {
            const folio = newOrder.data.order.Folio.value;
            removeAllCart()
            push(`/cart/success?order=${folio}`)
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
    const { back } = useRouter();

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
                    <div className={`${styles.back} display-flex align cursor`} onClick={() => back()}>
                        <FontAwesomeIcon icon={faArrowLeftLong} className={`icon__small`} />
                        <p>Regresar</p>
                    </div>
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
                                    <div className={`${styles.inputSearch} inputClean display-flex`}>
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
                        {
                            user?.PrecioIncIVA === 1 ?
                                <>
                                    <div className={styles.cost__data}>
                                        <p> <span>Total:</span> {format(total)}</p>
                                    </div>
                                    <div className={styles.cost__data}>
                                        <p>Los productos ya incluyen el IVA</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={styles.cost__data}>
                                        <p> <span>Subtotal:</span> {format(subTotal)}</p>
                                    </div>
                                    <div className={styles.cost__data}>
                                        <p> <span>Total:</span> {format(total)}</p>
                                    </div>
                                </>
                        }
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
