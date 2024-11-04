import React from 'react'
import styles from "../../../styles/Tables.module.scss";
import { ProductSquareCard } from '../../Cards/ProductSquareCard';
import ProductInterface from '@/interfaces/product';
import ButtonLoad from '../../Buttons/ButtonLoad';

interface GridInterface {
    data: ProductInterface[];
    handleLoadMore: () => void;
    handleSelectData: (arg: ProductInterface) => void;
    loadingMoreData: boolean;
    noMoreData: boolean;
    handleAddProduct?: (item: ProductInterface, newValue: number) => void
}

export default function Grid({
    data,
    handleLoadMore,
    handleSelectData,
    loadingMoreData,
    noMoreData,
    handleAddProduct
}: GridInterface) {

    return (
        <div className={styles.grid}>
            <div className={styles.contentGrid}>
                {
                    data?.map((item: ProductInterface) => {
                        return (
                            <ProductSquareCard
                                product={item}
                                key={item.Codigo && (item.Codigo + item.Id_Marca)}
                                onClick={handleSelectData}
                                handleAddProduct={handleAddProduct}
                            />
                        )
                    })
                }
            </div>

            {
                !noMoreData &&
                <div className={styles.laodMore}>
                    <ButtonLoad
                        buttonText='Ver más'
                        onClick={handleLoadMore}
                        loading={loadingMoreData}
                    />
                </div>
            }

            {
                noMoreData &&
                <p className={styles.message}>Ya no hay mas productos, cambia los filtros para ver otros resultados</p>
            }
        </div>
    )
}
