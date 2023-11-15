import React, { useContext, useState } from 'react'
import styles from "../../styles/Tables.module.scss";

import { AuthContext, CartContext } from '@/context';
import ProductInterface from '@/interfaces/product';
import Counter from '../Ui/Counter';
import { Tag } from '../Ui/Tag';
import Skeleton from 'react-loading-skeleton';
import { format } from '@/utils/currency';
import { capitalizarTexto } from '@/utils/textCapitalize';


interface Props {
    product: ProductInterface
}

// ProductCard - IS USED PRINCIPAL IN INDEX PAGE

const ProductCard = ({ product }: Props) => {

    const { addProductToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const isEmployee = user?.TipoUsuario === 2


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
        <div className={`${styles.item} cursor display-flex`}>
            <div className={`${styles.principalData} display-flex align`}>
                <div className='display-flex align'>
                    {product ? (
                        <p>{capitalizarTexto(product.Descripcion)}</p>
                    ) : (
                        <Skeleton width={200} height={20} />
                    )}
                </div>
            </div>

            <div className={`${styles.secondaryData} display-flex space-between`}>
                <div>
                    <p className='text-ellipsis display-flex align'><strong>Codigo: </strong>{product.Codigo}</p>
                </div>

                <div>
                    <p className="align"><strong>Marca: </strong>{product.Marca}</p>
                </div>

                <div>
                    <p className='text-ellipsis align'><strong>Familia: </strong>{product?.Familia}</p>
                </div>

                {isEmployee &&
                    <div>
                        <p className='text-ellipsis align'>
                            {
                                product?.Existencia < 0 ?
                                    <Tag>No Stock</Tag> :
                                    product?.Existencia
                            }
                        </p>
                    </div>
                }

                <div className={`${styles.price} display-flex align`}>
                    {
                        product?.Precio ?
                            <p>{format(product?.Precio)}</p> :
                            <Tag color="blue">No tiene precio</Tag>
                    }
                </div>

                <Counter
                    currentValue={product?.Piezas > 0 ? product?.Piezas : tempCartProduct.Piezas || 0}
                    maxValue={
                        product?.Existencia && product?.Existencia < 0 ? null : product?.Existencia
                    }
                    updatedQuantity={onUpdateQuantity}
                />
            </div>
        </div>
    )
}

const ProductCardMovil = ({ product }: Props) => {

    const { addProductToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const isEmployee = user?.TipoUsuario === 2

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
        <div className={`${styles.itemMovil} cursor display-flex`}>
            <div className={`${styles.principalData} display-flex align`}>
                <div className='display-flex align'>
                    {product ? (
                        <p>{capitalizarTexto(product.Descripcion)}</p>
                    ) : (
                        <Skeleton width={200} height={20} />
                    )}
                </div>
            </div>

            <div className={`${styles.secondaryData} display-flex space-between`}>
                <div>
                    <p className='text-ellipsis display-flex align'>Codigo: <strong>{product.Codigo}</strong></p>
                </div>

                <div>
                    <p className="align">Marca: <strong>{product.Marca}</strong></p>
                </div>

                <div>
                    <p className='text-ellipsis align'>Familia: <strong>{product?.Familia}</strong></p>
                </div>

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

            <div className={`${styles.tertiaryData} display-flex space-between`}>
                <div className={`${styles.price} display-flex align`}>
                    {
                        product?.Precio ?
                            <p>{format(product?.Precio)}</p> :
                            <Tag color="blue">No tiene precio</Tag>
                    }
                </div>

                <Counter
                    currentValue={product?.Piezas > 0 ? product?.Piezas : tempCartProduct.Piezas || 0}
                    maxValue={
                        product?.Existencia && product?.Existencia < 0 ? null : product?.Existencia
                    }
                    updatedQuantity={onUpdateQuantity}
                />
            </div>
        </div>
    )
}


export { ProductCard, ProductCardMovil }
