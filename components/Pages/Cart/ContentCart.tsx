import React, { useContext, useEffect, useState } from 'react';
import styles from "../../../styles/Pages/Cart.module.scss";

import { faAngleDoubleDown, faFileInvoice, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext, CartContext } from '@/context';
import { format } from '@/utils/currency';

import { MessageCard } from '@/components/Cards/MessageCard';
import ToggleSwitch from '@/components/Inputs/toggleSwitch';
import ButtonSmall from '@/components/Buttons/ButtonSmall';
import TableOrders from '@/components/Ui/Tables/TableComponents/TableSecondaryOrder';

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
        if (term === "") return setCartShowed(cart);
        const productFiltered = cart.filter((product) => product.Descripcion?.toLowerCase().includes(term.toLowerCase()))
        setCartShowed(productFiltered)
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className={styles.cart}>
            <div className={styles.content}>
                {
                    cartWithProducts &&
                    <div className={styles.orderConfig}>
                        <p><span>Solicitar productos inexistentes.</span> En la orden enviar solicitud de los productos actualmente inexistentes.</p>
                        
                        <ToggleSwitch
                            initialState={requestCartPending}
                            onToggle={(value: boolean) => setRequestCartPending(value)}
                        />
                    </div>
                }

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
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChangeInput(e)}
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

                            <TableOrders
                                products={cartShowed}
                                totalProducts={cartShowed.length}
                                loadingData={false}
                                buttonIsLoading={false}
                            />
                        </>
                        :
                        <MessageCard
                            title="No has agregado productos aún."
                            icon={faFileInvoice}
                        >
                            No hay productos en tu orden, apareceran una vez que agregues productos.
                        </MessageCard>
                }

                {
                    cartPendingWithProducts &&
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
                            <TableOrders
                                products={cartPending}
                                totalProducts={cartPending.length}
                                loadingData={false}
                                buttonIsLoading={false}
                            />
                        }
                    </div>
                }

                {
                    cartWithProducts &&
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
                }

                {
                    showDeleteCart &&
                    <>
                        <div className='divider'></div>

                        <div className={`${styles.deleteCart} display-flex align`}>
                            <div className={styles.text}>
                                <p>Vaciar Carrito</p>
                                <p>Si eliminas este carrito ya no podras recuperarlo.</p>
                            </div>

                            <ButtonSmall
                                text='Vaciar'
                                onClick={() => setOpenModalMessage(true)}
                                color='red'
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
