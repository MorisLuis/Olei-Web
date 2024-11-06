import React, { useContext, useState } from 'react';
import { faArrowUp, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { AuthContext, CartContext } from '@/context';
import { format } from '@/utils/currency';
import ProductInterface from '@/interfaces/product';
import toast from 'react-hot-toast';
import { capitalizarTexto } from '@/utils/textCapitalize';
import styles from "../../../styles/Cart.module.scss";
import ProductCard, { DataCardConfig } from '@/components/Cards/ProductCard';
import { MessageCard } from '@/components/Cards/MessageCard';
import Button from '@/components/Buttons/Button';
import ModalSideways from '../ModalSideways';
import ProductCardSkeleton from '@/components/Skeletons/Cards/ProductCardSkeleton';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const ModalCart = ({
    visible,
    onClose
}: Props) => {

    const { push } = useRouter()
    const [productDeleteFromCart, setProductDeleteFromCart] = useState(false)
    const { cart, cartPending, numberOfItems, subTotal, total, setProductDelete } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { removeCartProduct, addProductToCart } = useContext(CartContext)

    const handleCloseModal = () => {
        if (productDeleteFromCart) {
            setProductDelete(true)
            setTimeout(() => {
                setProductDelete(false)
                setProductDeleteFromCart(false)
                onClose();
            }, 10);
        } else {
            setTimeout(() => {
                onClose();
            }, 10);
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

    const renderFooter = () => {
        return (
            <div className={styles.Cart}>
                <div className={styles.footer}>
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
                            iconClassName="rotate45"
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <ModalSideways
            visible={visible}
            onClose={handleCloseModal}
            renderFooter={renderFooter()}
        >

            <div className={styles.Cart}>
                <div className={styles.content}>
                    {
                        !cart ?
                        <ProductCardSkeleton/>
                        :
                        cart.length > 0 ? cart.slice().reverse().map((product: ProductInterface, Index) =>
                            <ProductCard
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
            </div>
        </ModalSideways>
    )
};

export default ModalCart;
