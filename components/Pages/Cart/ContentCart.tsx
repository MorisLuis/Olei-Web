import React, { useContext, useEffect, useState } from 'react';
import styles from "../../../styles/Pages/Cart.module.scss";

import { faAngleDoubleDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductCardShort } from '@/components/Cards/ProductCardShort';
import { AuthContext, CartContext } from '@/context';
import { format } from '@/utils/currency';

import ProductInterface from '@/interfaces/product';
import { MessageCard } from '@/components/Cards/MessageCard';
import ToggleSwitch from '@/components/Inputs/toggleSwitch';

interface ContentCartInterface {
    setOpenModalMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContentCart = ({
    setOpenModalMessage
}: ContentCartInterface) => {


    const { cart, cartPending, total, subTotal } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const [requestOpen, setRequestOpen] = useState(false);
    const [requestCartPending, setRequestCartPending] = useState(true);
    const [cartShowed, setCartShowed] = useState(cart);
    const [inputValue, setInputValue] = useState("");

    const searchProductInCart = (term: string) => {
        if (term === "") {
            setCartShowed(cart);
            return;
        }
        const productFiltered = cart.filter((product) => product.Descripcion?.toLowerCase().includes(term.toLowerCase()))

        setCartShowed(productFiltered)
    }

    const handleOnChangeInput = (e: any) => {
        searchProductInCart(e.target.value)
        setInputValue(e.target.value)
    }

    const handleCleanInput = () => {
        setInputValue("")
        searchProductInCart("")
    }

    useEffect(() => {
        setCartShowed(cart)
    }, [cart])

    const cartWithProducts = cart.length > 0;
    const cartPendingWithProducts = cartPending.length > 0;
    const showDeleteCart = cartWithProducts || cartPendingWithProducts;
    const productsWithIVA = user?.PrecioIncIVA === 1;
    const searchEmpty = cartShowed.length > 0;


    return (
        <div className={styles.content}>
            <div className={`${styles.orderConfig} display-flex align space-between`}>
                <p><span>Solicitar productos inexistentes.</span> En la orden enviar solicitud de los productos actualmente inexistentes.</p>
                <ToggleSwitch
                    value={requestCartPending}
                    onChange={() => setRequestCartPending(false)}
                />
            </div>

            {
                cartWithProducts ?
                    <>
                        <div className={`${styles.search} display-flex space-between`}>
                            <div className={`${styles.inputSearch} inputClean display-flex`}>
                                <input
                                    type="text"
                                    className='input'
                                    value={inputValue}
                                    placeholder='Buscar producto...'
                                    onChange={(e: any) => handleOnChangeInput(e)}
                                />
                                {
                                    inputValue !== "" &&
                                    <div
                                        className="iconClean display-flex allCenter cursor"
                                        onClick={handleCleanInput}>
                                        <FontAwesomeIcon icon={faXmark} className={`icon__small`} />
                                    </div>
                                }
                            </div>
                        </div>

                        <div className={styles.table}>
                            {
                                searchEmpty ?
                                    cartShowed.map((product: ProductInterface, Index) =>
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
                cartPendingWithProducts &&
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

            <div className={`${styles.cost} display-flex column`}>
                {
                    productsWithIVA ?
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

            {
                showDeleteCart &&
                <>
                    <div className='divider'></div>

                    <div className={`${styles.deleteCart} display-flex align`}>
                        <div className={styles.text}>
                            <p>Vaciar Carrito</p>
                            <p>Si eliminas este carrito ya no podras recuperarlo.</p>
                        </div>
                        <button
                            className='button-small red'
                            onClick={() => setOpenModalMessage(true)}>
                            Vaciar
                        </button>
                    </div>
                </>
            }
        </div>
    )
}
