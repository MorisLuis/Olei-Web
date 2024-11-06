import ProductInterface from '@/interfaces/product'
import React, { useContext } from 'react'
import Table, { ColumnConfig } from '../Table';
import { CartContext } from '@/context';
import { capitalizarTexto } from '@/utils/textCapitalize';
import Counter from '../../Counter';
import { useProductsWithCartInfo } from '@/hooks/useProductsWithCartInfo';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { MessageCard } from '@/components/Cards/MessageCard';

interface TableProductsInterface {
    products: ProductInterface[];
    totalProducts: number;
    loadMoreProducts: () => Promise<void>;
    buttonIsLoading: boolean;
    loadingData: boolean;
}

export default function TableProducts({
    products,
    totalProducts,
    loadingData,
    buttonIsLoading,
    loadMoreProducts
}: TableProductsInterface) {

    const { addProductToCart } = useContext(CartContext);
    const { productsWithCartInfo } = useProductsWithCartInfo(products);
    const NoMoreProductToShow = productsWithCartInfo.length === totalProducts;

    const handleAddProduct = (item: ProductInterface, newValue: number) => {
        addProductToCart({
            ...item,
            Cantidad: newValue
        })
    };

    const columns: ColumnConfig<ProductInterface>[] = [
        {
            key: 'Descripcion',
            label: 'Descripción',
            render: (Descripción: string) => <span style={{ color: "black" }}>{capitalizarTexto(Descripción)}</span>,
        },
        {
            key: 'Codigo',
            label: 'Código',
            className: 'text-blue-500 font-bold',
        },
        {
            key: 'Precio',
            label: 'Precio (USD)',
            render: (value: number) => <span>${value.toFixed(2)}</span>,
        },
        {
            key: 'Existencia',
            label: 'Existencia',
        },
        {
            key: 'Cantidad',
            label: 'Cantidad',
            render: (value: number, item: ProductInterface) => (
                <Counter
                    counter={value ?? 0}
                    setCounter={(newValue: number) => handleAddProduct(item, newValue)}
                />
            ), width: "20%"
        },
    ];

    if (!loadingData) return <TableSkeleton />;

    if (productsWithCartInfo.length === 0) {
        return (
            <MessageCard title='No hay coincidencias exactas'>
                <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
            </MessageCard>
        )
    };

    return (
        <Table
            columns={columns}
            data={productsWithCartInfo}
            noMoreData={NoMoreProductToShow}
            loadingMoreData={buttonIsLoading}
            handleLoadMore={loadMoreProducts}
        />
    )
}
