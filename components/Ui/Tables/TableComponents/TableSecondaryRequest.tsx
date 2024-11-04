import React from 'react'
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSecondary, { ColumnSecondaryConfig } from '../TableSecondary';
import OrderInterface from '@/interfaces/order';
import { useRouter } from 'next/router';

interface TableRequestInterface {
    products: OrderInterface[];
    totalProducts: number;
    buttonIsLoading: boolean;
    loadingData: boolean;
    loadMoreProducts?: () => Promise<void>;
}

export default function TableRequest({
    products,
    totalProducts,
    loadingData,
    buttonIsLoading,
    loadMoreProducts
}: TableRequestInterface) {

    const NoMoreProductToShow = products.length === totalProducts;
    const { push } = useRouter()
    const columns: ColumnSecondaryConfig<OrderInterface>[] = [
        {
            key: 'Folio',
            label: 'Folio',
            render: (_: string, item: OrderInterface) => (
                <>
                    <h3 style={{ color: "black", fontWeight: 'bold' }}>Folio: {item.Folio}</h3>
                    <span style={{ color: "black" }}>Codigo: {item.Fecha}</span>
                </>
            )
        },
        {
            key: 'Cliente',
            label: 'Cliente',
            render: (_: string, item: OrderInterface) => <span style={{ color: "black" }}>Cliente: {item.Cliente}</span>
        },
        {
            key: 'Total',
            label: 'Total',
            render: (_: string, item: OrderInterface) => (
                <>
                    <h4 style={{ color: "black", fontWeight: 'bold' }}>Total: {item.Total}</h4>
                    <span style={{ color: "black" }}>Subtotal: {item.Subtotal}</span>
                </>
            )
        },
    ];

    const handleSelectRequest = (item: OrderInterface) => {
        push(`/profile/request/?receipt=${item.Folio}`);
    }

    if (loadingData) return <TableSkeleton />;

    if (products.length === 0) {
        return (
            <MessageCard title='No hay coincidencias exactas'>
                <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
            </MessageCard>
        )
    };

    return (
        <TableSecondary
            columns={columns}
            data={products}
            noMoreData={NoMoreProductToShow}
            loadingMoreData={buttonIsLoading}
            handleLoadMore={loadMoreProducts}
            onClick={(item) => handleSelectRequest(item)}
        />
    )
}
