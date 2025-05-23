import { MessageCard } from '@/components/Cards/MessageCard';
import Grid from '@/components/Ui/Tables/Grid';
import GridSkeleton from '@/components/Skeletons/GridSkeleton';
import { useProductsWithCartInfo } from '@/hooks/useProductsWithCartInfo';
import ProductInterface from '@/interfaces/product';
import React, { useContext } from 'react';
import { CartContext } from '@/context';

interface GridProductsInterface {
    products: ProductInterface[];
    totalProducts: number;
    loadMoreProducts: () => Promise<void>;
    handleSelectData: (product: ProductInterface) => Promise<void>;
    loadingData: boolean;
    buttonIsLoading: boolean;
}

export default function GridProducts({
    products,
    totalProducts,
    loadMoreProducts,
    buttonIsLoading,
    handleSelectData,
    loadingData
}: GridProductsInterface) {

    const { productsWithCartInfo } = useProductsWithCartInfo(products);
    const NoMoreProductToShow = productsWithCartInfo.length === totalProducts;

    const { addProductToCart } = useContext(CartContext);

    const handleAddProduct = (item: ProductInterface, newValue: number) => {
        addProductToCart({
            ...item,
            Cantidad: newValue
        })
    };

    if (loadingData) return <GridSkeleton />

    if (products.length === 0) {
        return (
            <MessageCard title='No hay coincidencias exactas'>
                <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
            </MessageCard>
        )
    };

    return (
        <Grid
            data={productsWithCartInfo}
            handleLoadMore={loadMoreProducts}
            handleSelectData={handleSelectData}
            loadingMoreData={buttonIsLoading}
            noMoreData={NoMoreProductToShow}
            handleAddProduct={handleAddProduct}
        />
    )
}
