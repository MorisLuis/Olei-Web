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
    product: ProductInterface
}

// ProductShoppingCard - IS USED PRINCIPAL IN CART MODAL

const ProductShoppingCard = ({ product }: Props) => {

    const { addProductToCart, removeCartProduct } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ProductInterface>({
        Descripcion: product.Descripcion,
        CodigoProducto: product.CodigoProducto,

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
        removeCartProduct(product)
        toast.success(`Se elimino del carrito ${product.Descripcion}`, {
            duration: 4000,
            position: "bottom-left"
        })
    }

    return (
        <div className={`${styles.productCartCard} displar-flex align`}>
            <div className={`${styles.productHeader} display-flex text-ellipsis space-between`}>
                <p className={`${styles.productName}`}>
                    {product?.Descripcion}
                </p>
                <div className={`${styles.delete} display-flex allCenter`} onClick={handleRemoveCartProduct}>
                    <FontAwesomeIcon icon={faTrashCan} className={`icon__small cursor display-flex align`} />
                </div>
            </div>

            <div className={`${styles.productInfo} display-flex space-between`}>
                <div className={`${styles.data} display-flex align`}>
                    <div className={`${styles.code}`}>
                        <p> <span>Codigo: </span> {product?.CodigoProducto}</p>
                    </div>

                    <span>·</span>

                    <div className={styles.price}>
                        {
                            product?.Precio ?
                                <p>$ {product?.Precio}</p> :
                                <Tag color="blue">No tiene precio</Tag>
                        }
                    </div>

                    <span>·</span>

                    <div className={`display-flex`}>
                        {
                            product?.Existencia && product?.Existencia < 1 ?
                                <Tag color="red">No Stock</Tag> :
                                <div className='display-flex'>
                                    <p className={styles.headersMovil}>Existencia: </p>
                                    <p>{product?.Existencia}</p>
                                </div>
                        }
                    </div>
                </div>
                <div className={styles.counter}>
                    <div className='display-flex'>
                        <Counter
                            currentValue={product?.Cantidad || 0}
                            maxValue={
                                product?.Existencia && product?.Existencia < 0 ? null : product?.Existencia
                            }
                            updatedQuantity={onUpdateQuantity}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductShoppingCard
