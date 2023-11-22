import React from 'react';
import styles from "../../../styles/Tables.module.scss";

import ProductInterface from '@/interfaces/product';
import ButtonAnimated from '@/components/Buttons/ButtonAnimated';
import GridSkeleton from '@/components/Skeletons/GridSkeleton';
import { useProductsWithCartInfo } from '@/hooks/useProductsWithCartInfo';
import { MessageCard } from '@/components/Cards/MessageCard';
import { ProductSquareCard } from '@/components/Cards/ProductSquareCard';

interface Props {
    data: ProductInterface[];
    loadMoreProducts: () => Promise<void>;
    buttonIsLoading: boolean;
    loadingData: boolean;
    handleSelectProduct: (product: ProductInterface) => Promise<void>;
}

const Grid = ({ data, loadMoreProducts, buttonIsLoading, loadingData, handleSelectProduct}: Props) => {

    const { productsWithCartInfo } =  useProductsWithCartInfo(data);
    const NoMoreProductToShow = !(productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0)

    return (
        <>
            {
                loadingData ?
                    <GridSkeleton />
                    :
                    !loadingData && productsWithCartInfo.length === 0 ?
                        <MessageCard title='No hay coincidencias exactas'>
                            <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
                        </MessageCard>
                        :
                        <>
                            <div className={styles.grid}>

                                <div className={styles.contentGrid}>
                                    {
                                        productsWithCartInfo?.map((product: ProductInterface, index: number) => {
                                            return (
                                                <ProductSquareCard
                                                    product={product}
                                                    key={product.Codigo && (product.Codigo + product.Id_Marca)}
                                                    onClick={(product: ProductInterface) => handleSelectProduct(product)}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                {
                                    (productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0) &&
                                    <div className={styles.loadMore}>
                                        <ButtonAnimated
                                            onclick={loadMoreProducts}
                                            disabled={buttonIsLoading}
                                        />
                                    </div>
                                }
                            </div>
                            {
                                NoMoreProductToShow &&
                                <p className={styles.message}>Ya no hay mas productos, cambia los filtros para ver otros resultados</p>
                            }
                        </>
            }
        </>

    )
}

export default Grid
