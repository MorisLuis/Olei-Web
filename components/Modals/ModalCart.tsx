import React, { useContext, useState } from 'react';
import styles from "../../styles/Modal.module.scss";

import { faAnglesRight, faArrowUp, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductShoppingCard, { DataCardConfig } from '../Cards/ProductShoppingCard';
import { useRouter } from 'next/router';
import { AuthContext, CartContext } from '@/context';
import { format } from '@/utils/currency';
import ProductInterface from '@/interfaces/product';
import { MessageCard } from '../Cards/MessageCard';
import Button from '../Buttons/Button';
import toast from 'react-hot-toast';
import { capitalizarTexto } from '@/utils/textCapitalize';


interface Props {
    visible: boolean;
    onClose: () => void;
}

const ModalCart = ({
    visible,
    onClose
}: Props) => {

    const { push } = useRouter()
    const [closing, setClosing] = useState(false);
    const [productDeleteFromCart, setProductDeleteFromCart] = useState(false)
    const { cart, cartPending, numberOfItems, subTotal, total, setProductDelete } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { removeCartProduct, addProductToCart } = useContext(CartContext)

    const handleCloseModal = () => {
        if (productDeleteFromCart) {
            setProductDelete(true)
            setClosing(true);
            setTimeout(() => {
                setClosing(false)
                setProductDelete(false)
                setProductDeleteFromCart(false)
                onClose();
            }, 300);
        } else {
            setClosing(true);
            setTimeout(() => {
                setClosing(false)
                onClose();
            }, 300);
        }
    };

    const handleRemoveCartProduct = (product: ProductInterface) => {
        setProductDeleteFromCart(true)
        removeCartProduct(product)
        toast.success(`Se elimino del carrito ${product.Descripcion}`, {
            duration: 4000,
            position: "bottom-left"
        })
    }

    const handleAddProduct = (item: ProductInterface, newValue: number) => {
        addProductToCart({
            ...item,
            Cantidad: newValue
        })
    };

    const dataCard: DataCardConfig<ProductInterface>[] = [
        {
            key: 'Descripcion',
            label: '',
            render: (Descripción: string) => (
                <span style={{ color: "black", fontWeight: "bold" }}>{capitalizarTexto(Descripción)}</span>
            ),
        },
        {
            key: 'Codigo',
            label: 'Código',
            className: 'text-blue-500 font-bold',
        },
        {
            key: 'Precio',
            label: 'Precio (USD)',
            render: (value: number) => <span>${value.toFixed(2)}</span>,
        },
    ];
    
    

    return visible ? (
        <>
            <div className={styles.modalBackground} onClick={onClose}></div>

            <div className={`${styles.modalSide} ${closing ? styles.closing : ''}`}>
                <div className={`${styles.header} display-flex space-between align`} >
                    <div className={`${styles.close} align cursor display-flex`} onClick={handleCloseModal}>
                        <FontAwesomeIcon icon={faAnglesRight} className={`icon cursor display-flex align`} />
                        <p>Cerrar</p>
                    </div>
                </div>

                <div className={styles.content}>
                    {
                        cart.length > 0 ? cart.slice().reverse().map((product: ProductInterface, Index) =>
                            <ProductShoppingCard
                                key={Index}
                                product={product}
                                onRemove={handleRemoveCartProduct}
                                onAdd={handleAddProduct}
                                data={dataCard}
                            />
                        )
                            :
                            <MessageCard
                                title="No has agregado productos aún"
                                icon={faCartShopping}
                            >
                                No hay productos en tu orden, apareceran una vez que agregues productos.
                            </MessageCard>
                    }
                </div>

                <div className={`${styles.footer} display-flex column`}>
                    <div>
                        {
                            cartPending.length > 0 &&
                            <div className={styles.productsPendingMessage}>
                                <h3>Peticiones</h3>
                                <p>Para ver los productos que pediste actualemente inexistentes, selecciona Ver carrito.</p>
                            </div>
                        }
                    </div>
                    <div className={styles.pricing}>
                        {
                            user?.PrecioIncIVA === 1 ?
                                <h4 className='display-flex'>Total ({numberOfItems} productos): {format(total)}</h4>
                                :
                                <h4 className='display-flex'>Subtotal ( {
                                    numberOfItems === 1 ? `${numberOfItems} producto` : `${numberOfItems} productos`
                                } ): {format(subTotal)}</h4>
                        }

                        <Button
                            text='Ver carrito'
                            onClick={() => push("/cart")}
                            icon={faArrowUp}
                        />
                    </div>
                </div>
            </div>
        </>
    ) : null;
};

export default ModalCart;
