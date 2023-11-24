import React, { useContext, useState } from 'react';
import styles from "../../styles/Components/Cards.module.scss";

import Counter from '../Ui/Counter';
import { AuthContext, CartContext } from '@/context';
import { format } from '@/utils/currency';
import ProductInterface from '@/interfaces/product';
import { Tag } from '../Ui/Tag';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface Props {
    product: ProductInterface,
    counterVisible?: boolean,
    productPending?: boolean
}

// ProductCardShort - IS USED PRINCIPAL IN REQUEST PAGE.

export const ProductCardShort = ({ product, counterVisible = true, productPending }: Props) => {

    const { pathname } = useRouter()

    const { addProductToCart, removeCartProduct, removeCartProductPending } = useContext(CartContext)
    const { user } = useContext(AuthContext)

    const [tempCartProduct, setTempCartProduct] = useState<ProductInterface>({
        Descripcion: product.Descripcion,
        Codigo: product.Codigo,

        Precio: product.Precio,

        Id_Familia: product.Id_Familia,
        Familia: product.Familia,

        Id_Marca: product.Id_Marca,
        Marca: product.Marca,
        Piezas: product.Piezas,
        Existencia: product.Existencia
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

    const handleRemoveCartProduct = () => {
        if (productPending) {
            removeCartProductPending(product)
            toast.success(`Se elimino del carrito ${product.Descripcion}`, {
                duration: 4000,
                position: "bottom-left"
            })

        } else {

            removeCartProduct(product)
            toast.success(`Se elimino del carrito ${product.Descripcion}`, {
                duration: 4000,
                position: "bottom-left"
            })
        }
    }

    return (
        <div className={`${styles.productCard}`}>
            <div className={`${styles.content} display-flex space-between`}>

                <div className={styles.productDescription}>
                    <p className={styles.title}>{product?.Descripcion?.trim()}</p>
                    <p className={styles.code}>Codigo: {product?.Codigo}</p>
                    <p className={styles.code}>Marca: {product?.Marca}</p>
                </div>

                <div className={styles.productData}>
                    <div className={styles.price}>
                        {
                            product?.Precio ? <p>{format(product?.Precio)}</p> :
                                <Tag color="blue">No tiene precio</Tag>
                        }
                    </div>

                    <div className='display-flex'>
                        <p className={styles.subtotal}>Subtotal: {product?.Piezas && format((product?.Precio * product?.Piezas))}</p>
                    </div>
                </div>

                <div className={styles.productCounter}>
                    {
                        counterVisible ?
                            <Counter
                                currentValue={product?.Piezas || 0}
                                maxValue={product?.Existencia && product?.Existencia < 0 ? null : product?.Existencia}
                                updatedQuantity={onUpdateQuantity}
                            />
                            :
                            <p>Piezas: {product.Piezas}</p>
                    }
                    {
                        user?.PrecioIncIVA === 1 ?
                            <p className={styles.subtotal}>Total: {product?.Piezas && format((product?.Precio * product?.Piezas))}</p>
                            :
                            <p className={styles.subtotal}>Total: {product?.Piezas && format((product?.Precio * product?.Piezas) + (product?.Precio * product?.Piezas * (parseInt(product.Impuesto) / 100)))}</p>
                    }
                </div>

                {
                    (pathname !== "/profile/request" && pathname !== "/profile/pendingrequest" && pathname !== "/[receipt]") &&
                    <>
                        <div className={`${styles.deleteText} display-flex`} onClick={handleRemoveCartProduct}>
                            <p>Eliminar</p>
                        </div>

                        <div className={`${styles.delete} display-flex`} onClick={handleRemoveCartProduct}>
                            <div className={`${styles.container} display-flex allCenter cursor`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" className='icon__small'>
                                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                                </svg>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
