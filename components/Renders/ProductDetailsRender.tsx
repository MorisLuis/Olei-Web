import React, { useContext, useEffect, useState } from 'react';
import styles from './../../styles/Pages/ProductDetails.module.scss';

import ProductInterface from '@/interfaces/product';
import Counter from '../Ui/Counter';
import { CartContext } from '@/context';
import { useProductWithCartInfo } from '@/hooks/useProductWithCartInfo';
import { ImageGallery } from './ImageGallery';
import { format } from '@/utils/currency';

export const ProductDetailsRender = ({ product }: { product: ProductInterface }) => {

    const { productWithCartInfo } = useProductWithCartInfo(product);
    const { addProductToCart } = useContext(CartContext);
    const [tempCartProduct, setTempCartProduct] = useState<ProductInterface | null>(null);

    const { Precio, Descripcion, Codigo, Existencia, Familia, Marca, imagen, Observaciones, Piezas } = productWithCartInfo || {};

    const onUpdateQuantity = async (newPiezas: number) => {
        if (productWithCartInfo) {
            setTempCartProduct((currentProduct) => ({
                ...currentProduct!,
                Piezas: newPiezas,
            }));

            addProductToCart({
                ...productWithCartInfo,
                Piezas: newPiezas,
            });
        }
    };

    // Set the tempCartProduct with productWithCartInfo.
    useEffect(() => {
        if (!productWithCartInfo) return;
        setTempCartProduct(productWithCartInfo);
    }, [productWithCartInfo]);

    return (
        <>
            {product ? (
                <div className={styles.pageDetails}>
                    <ImageGallery images={imagen} />
                    <div className={styles.content}>
                        <section className={styles.details}>
                            <h1>{Descripcion}</h1>
                            <p><span>Codigo: </span>{Codigo}</p>
                            <p><span>Marca: </span>{Marca}</p>
                            <p><span>Familia: </span>{Familia}</p>

                            {
                                Observaciones &&
                                <>
                                    <div className='divider'></div>
                                    <span>Obervaciones</span>
                                    <p>{Observaciones}</p>
                                </>
                            }
                        </section>


                        <section className={styles.price}>
                            <div className={styles.number}>
                                <span>Precio</span>
                                <p>{format(Precio)} MXN</p>
                            </div>

                            <Counter
                                currentValue={Piezas > 0 ? Piezas : (tempCartProduct?.Piezas || 0)}
                                maxValue={Existencia && Existencia < 0 ? null : Existencia}
                                updatedQuantity={onUpdateQuantity}
                            />
                        </section>
                    </div>

                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </>
    );
};
