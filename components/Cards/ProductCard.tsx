import React, { useContext, useState } from 'react'
import styles from "../../styles/UI.module.scss";

import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product';
import Counter from '../Ui/Counter';
import { Tag } from '../Ui/Tag';

interface Props {
    product: ProductInterface
}

// ProductCard - IS USED PRINCIPAL IN INDEX PAGE

const ProductCard = ({ product }: Props) => {

    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ProductInterface>({
        Precio: product.Precio,
        Cantidad: 0,

        Id_Familia: product.Id_Familia,
        Id_Marca: product.Id_Marca,

        Descripcion: product.Descripcion,
        CodigoProducto: product.CodigoProducto,
        Existencia: product.Existencia,
        Familia: product.Familia,
        Marca: product.Marca,
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
                        <p className='text-ellipsis display-flex align'><strong>Codigo: </strong>{product?.CodigoProducto}</p>
                    </div>

                    <div><p className="align"><strong>Marca: </strong>{product.Marca}</p></div>

                    <div><p className='text-ellipsis align'><strong>Familia: </strong>{product?.Familia}</p></div>

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
                    <div className={styles.price}>
                        {
                            product?.Precio ?
                                <p>$ {product?.Precio}</p> :
                                <Tag color="blue">No tiene precio</Tag>
                        }
                    </div>
                    <Counter
                        currentValue={product?.Cantidad ? product?.Cantidad : tempCartProduct.Cantidad || 0}
                        maxValue={10}
                        updatedQuantity={onUpdateQuantity}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCard
