import React, { useContext } from 'react';
import styles from "../../styles/Components/Cards.module.scss";

import ProductInterface from '@/interfaces/product';
import { Tag } from '../Ui/Tag';
import { AuthContext } from '@/context';
import { format } from '../../utils/currency';
import { capitalizarTexto } from '@/utils/textCapitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import Counter from '../Ui/Counter';

interface Props {
    product: ProductInterface,
    onClick?: (arg: ProductInterface) => void;
    handleAddProduct?: (item: ProductInterface, newValue: number) => void
}


export const ProductSquareCard = ({ product, onClick, handleAddProduct }: Props) => {

    const { user } = useContext(AuthContext);
    const { pathname, query } = useRouter();
    const isEmployee = user?.TipoUsuario === 2;

    return (
        <div className={styles.ProductSquareCard} >
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
                        onClick={() => onClick?.(product)}
                    >
                        {
                            product?.imagen ?
                                <Image
                                    src={product.imagen}
                                    alt={product.Descripcion}
                                    width={200}
                                    height={200}
                                />
                                :
                                <div className={styles.notImage}>
                                    <FontAwesomeIcon icon={faImage} className={`icon`} />
                                    <h2>{user?.Nombre}</h2>
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
                                <p className={styles.stock}>
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
                            counter={product?.Cantidad}
                            setCounter={(value: number) => handleAddProduct?.(product, value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
