import React, { useContext, useEffect, useState } from 'react';
import styles from './../../styles/Pages/ProductDetails.module.scss';

import ProductInterface from '@/interfaces/product';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Counter from '../Ui/Counter';
import { CartContext } from '@/context';
import { useProductWithCartInfo } from '@/hooks/useProductWithCartInfo';

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
                    <section className={styles.images}>
                        <div className={styles.principalImage}>
                            <motion.div
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <Image
                                    src={imagen ? imagen[0] : '/OleiImageTest/topeRebote.webp'}
                                    alt="image"
                                    width={200}
                                    height={200}
                                />
                            </motion.div>
                        </div>
                        {imagen && imagen.length > 0 && (
                            <div className={styles.otherImages}>
                                {imagen.map((img: string, index: number) => (
                                    <Image
                                        src={img ? img : '/OleiImageTest/topeRebote.webp'}
                                        alt={img}
                                        width={200}
                                        height={200}
                                        key={index}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <section className={styles.title}>
                        <h1>{Descripcion}</h1>
                    </section>

                    <Counter
                        currentValue={Piezas > 0 ? Piezas : (tempCartProduct?.Piezas || 0)}
                        maxValue={Existencia && Existencia < 0 ? null : Existencia}
                        updatedQuantity={onUpdateQuantity}
                    />

                    <p>{Precio}</p>
                    <p>{Observaciones}</p>
                    <p>Codigo: {Codigo}</p>
                    <p>Marca: {Marca}</p>
                    <p>Familia: {Familia}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </>
    );
};
