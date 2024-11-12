import React, { useContext, useEffect, useState } from 'react';
import styles from "../../../styles/Pages/Cart.module.scss";

import { faAngleDoubleDown, faFileInvoice, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext, CartContext } from '@/context';
import { format } from '@/utils/currency';

import { MessageCard } from '@/components/Cards/MessageCard';
import TableOrders from '@/components/Ui/Tables/TableComponents/TableSecondaryOrder';
import ActionCard from '@/components/Cards/ActionCard';
import Input from '@/components/Inputs/inputs';

interface ContentCartInterface {
    setOpenModalMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContentCart = ({
    setOpenModalMessage
}: ContentCartInterface) => {


    const { cart, cartPending, total, subTotal } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const [requestOpen, setRequestOpen] = useState(false);
    const [cartShowed, setCartShowed] = useState(cart);
    const [inputValue, setInputValue] = useState("");

    const searchProductInCart = (term: string) => {
        if (term === "") return setCartShowed(cart);
        const productFiltered = cart.filter((product) => product.Descripcion?.toLowerCase().includes(term.toLowerCase()))
        setCartShowed(productFiltered)
    }

    const handleOnChangeInput = (e: string) => {
        searchProductInCart(e)
        setInputValue(e)
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
                    <ActionCard
                        title='Solicitar productos inexistentes'
                        subtitle='En la orden enviar solicitud de los productos actualmente inexistentes.'
                        toggle={true}
                        onChange={() => console.log(false)}
                    />
                }

                {
                    cartWithProducts ?
                        <>
                            <div className={styles.search}>
                                <div className={styles.inputSearch}>
                                    <Input
                                        value={inputValue}
                                        name='search'
                                        onChange={(e) => handleOnChangeInput(e)}
                                        clearInput={handleCleanInput}
                                    />
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
                        <div
                            className={styles.handleRequest}
                            onClick={() => setRequestOpen(!requestOpen)}
                        >
                            <div className={styles.content}>
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
                    <div className={styles.cost}>
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

                <div className='divider'></div>

                {
                    showDeleteCart &&
                    <ActionCard
                        title='Vaciar Carrito'
                        subtitle='Si eliminas este carrito ya no podras recuperarlo.'
                        color="red"
                        onClick={() => setOpenModalMessage(true)}
                    />
                }
            </div>
        </div>
    )
}
