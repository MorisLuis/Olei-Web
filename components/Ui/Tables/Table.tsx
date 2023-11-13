import React, { useContext, useEffect, useState } from 'react';
import styles from "../../../styles/UI.module.scss";

import ProductCard from '../../Cards/ProductCard';
import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product';
import { MessageCard } from '../../Cards/MessageCard';
import TableSkeleton from '../../Skeletons/TableSkeleton';
import ButtonAnimated from '@/components/Buttons/ButtonAnimated';
import { useProductsWithCartInfo } from '@/hooks/useProductsWithCartInfo';

interface Props {
    data: ProductInterface[],
    loadMoreProducts: () => Promise<void>,
    isLoading: boolean,
    loadingData: boolean
}

const Table = ({ data, loadMoreProducts, isLoading, loadingData }: Props) => {

    const { productsWithCartInfo } =  useProductsWithCartInfo(data)

    return (
        <>
            {
                loadingData ?
                    <TableSkeleton />
                    :
                    !loadingData && productsWithCartInfo.length === 0 ?
                        <MessageCard title='No hay coincidencias exactas'>
                            <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
                        </MessageCard>
                        :
                        <>
                            <div className={`${styles.table}`}>
                                <div className={styles.content}>
                                    <div className={`${styles.headers} display-flex space-between`}>
                                        <p>Nombre</p>
                                        <p>Codigo</p>
                                        <p>Marca</p>
                                        <p>Familia</p>
                                        <p>Precio (MXN)</p>
                                        <p></p>
                                    </div>

                                    <div className={styles.data}>
                                        {
                                            productsWithCartInfo?.map((product: ProductInterface) => {
                                                return (
                                                    <ProductCard product={product} key={product.Codigo && (product.Codigo + product.Id_Marca)} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {
                                    (productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0) &&
                                    <div className={styles.loadMore}>
                                        <ButtonAnimated
                                            onclick={loadMoreProducts}
                                            disabled={isLoading}
                                        />
                                    </div>
                                }
                            </div>

                            {
                                !(productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0) &&
                                <p style={{ textAlign: "center", paddingTop: "1em", color: "gray" }}>Ya no hay mas productos, cambia los filtros para ver otros resultados</p>
                            }
                        </>
            }
        </>
    )
}

export default Table;