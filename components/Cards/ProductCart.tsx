import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product';
import { ProductCartInterface } from '@/interfaces/productCart';
import React, { useContext, useState } from 'react'
import styles from "../../styles/UI.module.scss";
import Counter from '../Ui/Counter';
import { Tag } from '../Ui/Tag';

interface Props {
    product: ProductInterface
}

const ProductCart = ({
    product
}: Props) => {

    const { addProductToCart } = useContext(CartContext)


    const [tempCartProduct, setTempCartProduct] = useState<ProductCartInterface>({
        Descripcion: product.Descripcion,
        Id_Familia: product.Id_Familia,
        Familia: product.Familia,
        CodigoProducto: product.CodigoProducto,
        Precio: product.Precio,
        Cantidad: 1
    })

    const onUpdateQuantity = (Cantidad: number) => {

        /* addProductToCart(currentProduct => ({
            ...currentProduct,
            Cantidad
        })); */

        addProductToCart({
            ...tempCartProduct, // Utiliza los valores actuales del producto
            Cantidad, // Actualiza la cantidad con el valor proporcionado
        });
    }

    const onAddProduct = () => {
        addProductToCart(tempCartProduct);
    }


    return (
        <div className={`${styles.item} cursor display-flex`}>
            <div className={`${styles.principalData} display-flex align`}>
                <div className='display-flex align'>
                    <p>{product?.Descripcion}</p>
                </div>
            </div>

            <div className={`${styles.secondaryData} display-flex space-between`}>
                <div className={`${styles.notCounter} display-flex space-between allCenter`}>
                    <div>
                        <p className='text-ellipsis display-flex align'>{product?.CodigoProducto}</p>
                    </div>
                    <div className={styles.price}>
                        {
                            product?.Precio ?
                                <p>$ {product?.Precio}</p> :
                                <Tag color="blue">No tiene precio</Tag>
                        }
                    </div>

                    <div>
                        <p>{product?.Familia}</p>
                    </div>

                    <div className='display-flex align'>
                        {
                            product?.Existencia <= 0 ?
                                <Tag color="red">No Stock</Tag> :
                                <div className='display-flex'>
                                    <p className={styles.headersMovil}>Existencia: </p>
                                    <p>{product?.Existencia}</p>
                                </div>
                        }
                    </div>
                </div>

                <div className={`${styles.counterColumn} display-flex`}>
                    <Counter
                        currentValue={tempCartProduct.Cantidad}
                        maxValue={10}
                        updatedQuantity={onUpdateQuantity}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCart
