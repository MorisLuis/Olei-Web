import React, { useContext, useState } from 'react';
import styles from "../../styles/Components/Cards.module.scss";

import ProductInterface from '@/interfaces/product';
import Image from 'next/image';
import { Tag } from '../Ui/Tag';
import Counter from '../Ui/Counter';
import { CartContext } from '@/context';
import { format } from '../../utils/currency';

interface Props {
    product: ProductInterface,
    image: string[],
    index: number
}


export const ProductSquareCard = ({ product, image, index }: Props) => {

    format

    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState<ProductInterface>({
        Precio: product.Precio,
        Piezas: 0,

        Id_Familia: product.Id_Familia,
        Id_Marca: product.Id_Marca,

        Descripcion: product.Descripcion,
        Codigo: product.Codigo,
        Existencia: product.Existencia,
        Familia: product.Familia,
        Marca: product.Marca,
        Impto: product.Impto
    })

    const onUpdateQuantity = async (Piezas: number) => {

        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            Piezas
        }));

        addProductToCart({
            ...tempCartProduct,
            Piezas
        });
    }


    return (
        <div className={styles.productSquareCard}>
            <div className={styles.content}>
                <div className={styles.image}>
                    <Image
                        src={image[index] ? image[index] : "/logo01.png"}
                        alt="photo"
                        width={200}
                        height={200}
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.description}>
                        <h4>{product.Descripcion}</h4>
                        <Tag color='gray'>
                            {product.Familia}
                        </Tag>
                    </div>
                    <p>Codigo: {product.Codigo}</p>
                    <p>Marca: {product.Familia}</p>

                    <div className={styles.counter}>
                        {
                            product?.Precio ?
                                <h3>{format(product?.Precio)}</h3> :
                                <Tag color="blue">No tiene precio</Tag>
                        }
                        <Counter
                            currentValue={product?.Piezas > 0 ? product?.Piezas : tempCartProduct.Piezas || 0}
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
