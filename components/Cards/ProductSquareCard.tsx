import React, { useContext, useEffect, useState } from 'react';
import styles from "../../styles/Components/Cards.module.scss";

import ProductInterface from '@/interfaces/product';
import { Tag } from '../Ui/Tag';
import Counter from '../Ui/Counter';
import { AuthContext, CartContext } from '@/context';
import { format } from '../../utils/currency';
import { capitalizarTexto } from '@/utils/textCapitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface Props {
    product: ProductInterface,
    index: number
}


export const ProductSquareCard = ({ product }: Props) => {

    const { addProductToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [imageLoaded, setImageLoaded] = useState(false);

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
        Impuesto: product.Impuesto
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

    // Used to know if the image exist.
    useEffect(() => {
        const img = new Image();
        img.src = `https://oleistorage.blob.core.windows.net/oleidb1/${product.Codigo}.jpg`;

        img.onload = () => {
            setImageLoaded(true);
        };

        img.onerror = () => {
            setImageLoaded(false);
        };
    }, [product.Codigo]);

    return (
        <div className={styles.productSquareCard}>
            <div className={styles.content}>
                <div className={styles.image}>
                    {
                        imageLoaded ?
                            <img
                            src={(imageLoaded && product.imagen) ? product?.imagen : "/logo02.png"}
                            alt={product.Descripcion}
                                width={200}
                                height={200}
                            />
                            :
                            <div className={styles.notImage}>
                                <FontAwesomeIcon icon={faImage} className={`icon`} />
                                <h2>{user?.Company}</h2>
                            </div>
                    }
                </div>
                <div className={styles.info}>
                    <div className={styles.description}>
                        <h4>{capitalizarTexto(product.Descripcion)}</h4>
                        <Tag color='gray'>
                            {product.Familia}
                        </Tag>
                    </div>

                    <div className={styles.data}>
                        <p>Codigo: {product.Codigo}</p>
                        <p>Marca: {product.Marca}</p>
                    </div>


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
