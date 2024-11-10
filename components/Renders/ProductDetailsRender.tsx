import React, { useContext, useEffect, useState } from 'react';
import ProductInterface from '@/interfaces/product';
import Counter from '../Ui/Counter';
import { AuthContext, CartContext } from '@/context';
import { useProductWithCartInfo } from '@/hooks/useProductWithCartInfo';
import { ImageGallery } from './ImageGallery';
import { format } from '@/utils/currency';
import { ProductDetailsRenderSkeleton } from '../Skeletons/ProductDetailsRenderSkeleton';
import { Tag } from '../Ui/Tag';
import styles from './../../styles/Pages/ProductDetails.module.scss';

export const ProductDetailsRender = ({ product }: { product: ProductInterface }) => {

    const { productWithCartInfo } = useProductWithCartInfo(product);
    const { addProductToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const isEmployee = user?.TipoUsuario === 2;
    const [tempCartProduct, setTempCartProduct] = useState<ProductInterface | null>(null);

    const { Precio, Descripcion, Codigo, Familia, Marca, Observaciones, Cantidad } = productWithCartInfo || {};

    const onUpdateQuantity = async (newPiezas: number) => {
        if (productWithCartInfo) {
            setTempCartProduct((currentProduct) => ({
                ...currentProduct!,
                Cantidad: newPiezas,
            }));

            addProductToCart({
                ...productWithCartInfo,
                Cantidad: newPiezas,
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
            {
                product ? (
                    <div className={styles.pageDetails}>

                        <ImageGallery images={product.imagenes} />

                        <div className={styles.pageDetails__content}>

                            <div className={styles.header}>
                                <h1>{Descripcion}</h1>
                                <div className={styles.price}>
                                    <span>Precio</span>
                                    <p>{format(Precio)}</p>
                                </div>
                            </div>

                            {
                                Observaciones &&
                                <div className={styles.observations}>
                                    <p>Obervaciones: </p>
                                    <span>{Observaciones}</span>
                                </div>
                            }

                            <section className={styles.details}>
                                <div>
                                    <p>Codigo: </p>
                                    <span>{Codigo}</span>
                                </div>

                                <div>
                                    <p>Marca: </p>
                                    <span>{Marca}</span>
                                </div>

                                <div>
                                    <p>Familia: </p>
                                    <span>{Familia}</span>
                                </div>
                            </section>

                            <section className={styles.counter}>
                                {
                                    isEmployee &&
                                    <div className={styles.stock}>
                                        <p className={`display-flex  align`}>
                                            Existencia:
                                        </p>
                                        <div>
                                            {
                                                product?.Existencia < 0 ?
                                                    <Tag>No Stock</Tag> :
                                                    <strong>{product?.Existencia}</strong>
                                            }
                                        </div>
                                    </div>
                                }
                                <div className={styles.action}>
                                    <p>Agregar al carrito:</p>
                                    <Counter
                                        counter={Cantidad > 0 ? Cantidad : (tempCartProduct?.Cantidad || 0)}
                                        setCounter={(value: number) => onUpdateQuantity(value)}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                ) :
                    <ProductDetailsRenderSkeleton />
            }
        </>
    );
};
