import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSecondary, { ColumnSecondaryConfig } from '../TableSecondary';
import OrderInterface from '@/interfaces/order';
import { useRouter } from 'next/router';
import { Tag } from '../../Tag';
import { capitalizarTexto } from '@/utils/textCapitalize';
import { dateFormat } from '@/utils/dateFormat';
import { format } from '@/utils/currency';
import ProductInterface from '@/interfaces/product';

interface TableSecondaryRequestDetailsInterface {
    products: ProductInterface[];
    totalProducts: number;
    buttonIsLoading: boolean;
    loadingData: boolean;
    loadMoreProducts?: () => Promise<void>;
}

export default function TableSecondaryRequestDetails({
    products,
    totalProducts,
    loadingData,
    buttonIsLoading,
    loadMoreProducts
}: TableSecondaryRequestDetailsInterface) {

    const NoMoreProductToShow = products.length === totalProducts;
    const { push } = useRouter();

    const columns: ColumnSecondaryConfig<ProductInterface>[] = [
        {
            key: 'Codigo',
            label: 'Fecha',
            render: (_: string, item: ProductInterface) => (
                <>
                    <h4 style={{ color: "black", fontWeight: 'bold' }}>{item.Descripcion}</h4>
                    <p>{item.Codigo}</p>
                </>
            )
        },
        {
            key: 'Familia',
            label: 'Familia',
            render: (_: string, item: ProductInterface) => (
                <>
                    <p style={{ color: "black" }}><span>Familia:</span> {item.Familia}</p>
                    <p style={{ color: "black" }}><span>Marca:</span> {item.Marca}</p>

                </>
            )
        },
        {
            key: 'Precio',
            label: 'Precio',
            render: (_: string, item: ProductInterface) => (
                <>
                    <p><span>Precio:</span> {format(item.Precio)}</p>
                    <p><span>Cantidad:</span> {item.Cantidad}</p>

                </>
            )
        },
    ];

    const handleSelectRequest = (item: ProductInterface) => {
        push(`/profile/request/?receipt=${item.Codigo}`);
    }

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
