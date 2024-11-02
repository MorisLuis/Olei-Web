import { MessageCard } from '@/components/Cards/MessageCard';
import GridTest from '@/components/Ui/Tables/Grid';
import GridSkeleton from '@/components/Skeletons/GridSkeleton';
import { useProductsWithCartInfo } from '@/hooks/useProductsWithCartInfo';
import ProductInterface from '@/interfaces/product';
import React from 'react';

interface GridProductsInterface {
    products: ProductInterface[];
    loadMoreProducts: () => Promise<void>;
    handleSelectData: (product: ProductInterface) => Promise<void>;
    loadingData: boolean;
    buttonIsLoading?: boolean;
}

export default function GridProducts({
    products,
    loadMoreProducts,
    buttonIsLoading,
    handleSelectData,
    loadingData
}: GridProductsInterface) {

    const { productsWithCartInfo } = useProductsWithCartInfo(products);
    const NoMoreProductToShow = productsWithCartInfo.length === 20;

    if (loadingData) return <GridSkeleton />

    if (products.length === 0) {
        return (
            <MessageCard title='No hay coincidencias exactas'>
                <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
            </MessageCard>
        )
    }

    return (
        <GridTest
            data={productsWithCartInfo}
            handleLoadMore={loadMoreProducts}
            handleSelectData={handleSelectData}
            loadingMoreData={loadingData}
            noMoreData={NoMoreProductToShow}
        />
    )
}
