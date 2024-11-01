import React, { useContext, useState } from 'react';
import styles from "../../styles/Components/Cards.module.scss";

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Counter from '../Ui/Counter';
import { CartContext } from '@/context';
import { Tag } from '../Ui/Tag';
import ProductInterface from '@/interfaces/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

interface Props {
    product: ProductInterface,
    setProductDeleteFromCart: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductShoppingCard = ({ product, setProductDeleteFromCart }: Props) => {

    const { addProductToCart, removeCartProduct } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ProductInterface>({
        Descripcion: product.Descripcion,
        Codigo: product.Codigo,

        Precio: product.Precio,

        Id_Familia: product.Id_Familia,
        Familia: product.Familia,

        Id_Marca: product.Id_Marca,
        Marca: product.Marca,
        Cantidad: product.Cantidad,
        Existencia: product.Existencia
    })

    const onUpdateQuantity = async (Cantidad: number) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            Cantidad
        }));

        addProductToCart({
            ...tempCartProduct,
            Cantidad
        });
    }

    const handleRemoveCartProduct = () => {
        setProductDeleteFromCart(true)
        removeCartProduct(product)
        toast.success(`Se elimino del carrito ${product.Descripcion}`, {
            duration: 4000,
            position: "bottom-left"
        })
    }

    return (
        <div className={styles.ProductShoppingCard}>
            <div className={styles.productHeader}>
                <p className={`${styles.productName}`}>
                    {product?.Descripcion}
                </p>
                <div className={styles.delete} onClick={handleRemoveCartProduct}>
                    <FontAwesomeIcon icon={faTrashCan} className={`icon__small display-flex align`} />
                </div>
            </div>

            <div className={styles.productInfo}>
                <div className={styles.data}>
                    <div className={styles.item}>
                        <p> <span>Codigo: </span> {product?.Codigo}</p>
                    </div>

                    <div className={styles.item}>
                        {
                            product?.Precio ?
                                <p> <span>Precio: </span> {product?.Precio}</p> :
                                <Tag color="blue">No tiene precio</Tag>
                        }
                    </div>
                </div>
                <div className={styles.counter}>
                    <Counter
                        counter={product?.Cantidad || 0}
                        setCounter={(value: number) => onUpdateQuantity(value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductShoppingCard
