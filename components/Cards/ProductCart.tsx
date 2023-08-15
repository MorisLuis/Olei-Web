import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product';
import { ProductCartInterface } from '@/interfaces/productCart';
import React, { useContext, useState } from 'react'
import styles from "../../styles/UI.module.scss";
import Counter from '../Ui/Counter';
import { Tag } from '../Ui/Tag';

interface Props {
    product: ProductInterface | ProductCartInterface
}

const ProductCart = ({
    product
}: Props) => {

    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ProductCartInterface>({
        Descripcion: product.Descripcion,
        CodigoProducto: product.CodigoProducto,
        Existencia: product.Existencia,

        Precio: product.Precio,

        Id_Familia: product.Id_Familia,
        Familia: product.Familia,
        
        Id_Marca: product.Id_Marca,
        Marca: product.Marca,
        Cantidad: 0,
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

                    <div>
                        <p>{product.Marca}</p>
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
                            product?.Existencia && product?.Existencia < 1 ?
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
                        currentValue={product?.Cantidad  ? product?.Cantidad : tempCartProduct.Cantidad || 0}
                        maxValue={10}
                        updatedQuantity={onUpdateQuantity}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCart
