import React, { useContext, useState } from 'react';
import styles from "../../styles/Components/Cards.module.scss";

import Counter from '../Ui/Counter';
import { ProductCartInterface } from '@/interfaces/productCart';
import { CartContext } from '@/context';
import { Tag } from '../Ui/Tag';

interface Props {
    product: ProductCartInterface
}

// ProductShoppingCard - IS USED PRINCIPAL IN CART MODAL

const ProductShoppingCard = ({ product }: Props) => {

    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ProductCartInterface>({
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

    return (
        <div className={`${styles.productCardCard} displar-flex align`}>
            <div className={styles.productName}>
                {product?.Descripcion}
            </div>

            <div className={`${styles.productInfo} display-flex space-between`}>
                <div className={`${styles.data} display-flex align`}>
                    <div className={`${styles.code} display-flex`}>
                        <p className={`text-ellipsis`}> <span>Codigo: </span> {product?.CodigoProducto}</p>
                    </div>

                    <span>·</span>

                    <div className={styles.price}>
                        <p>${product?.Precio} MXN</p>
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
                            maxValue={10}
                            updatedQuantity={onUpdateQuantity}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductShoppingCard
