import React, { useContext, useState } from 'react';
import styles from "../../styles/Components/Cards.module.scss";

import ProductInterface from '@/interfaces/product';
import { Tag } from '../Ui/Tag';
import Counter from '../Ui/Counter';
import { AuthContext, CartContext } from '@/context';
import { format } from '../../utils/currency';
import { capitalizarTexto } from '@/utils/textCapitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';

interface Props {
    product: ProductInterface,
    onClick?: any
}


export const ProductSquareCard = ({ product, onClick }: Props) => {

    const { addProductToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const isEmployee = user?.TipoUsuario === 2;
    const { pathname, query } = useRouter();


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

    return (
        <div className={styles.productSquareCard} onClick={() => onClick(product)}>
            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                >
                    <Link
                        className={styles.image}
                        scroll={false}
                        shallow
                        href={{ pathname, query: { ...query, product: `/products?product=${product.Codigo}&Marca=${product.Marca}` } }}
                        as={`/product/${product.Codigo}?Marca=${product.Marca}`}
                    >
                        {
                            product?.imagen ?
                                <Image
                                    src={"https://oleistorage.blob.core.windows.net/mxnl00181/002.jpg"}
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
                    </Link>
                </motion.div>


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
                        {isEmployee &&
                            <div>
                                <p className={`${styles.stock} display-flex text-ellipsis align`}>
                                    Existencia:
                                    {
                                        product?.Existencia < 0 ?
                                            <Tag>No Stock</Tag> :
                                            <strong>{product?.Existencia}</strong>
                                    }
                                </p>
                            </div>
                        }
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
