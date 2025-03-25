import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSecondary, { ColumnSecondaryConfig } from '../TableSecondary';
import { format } from '@/utils/currency';
import ProductInterface from '@/interfaces/product';
import { Tag } from '../../Tag';

interface TableSecondaryRequestDetailsInterface {
    products: ProductInterface[];
    totalProducts: number;
    buttonIsLoading: boolean;
    loadMoreProducts?: () => Promise<void>;
}

export default function TableSecondaryRequestDetails({
    products,
    totalProducts,
    buttonIsLoading,
    loadMoreProducts
}: TableSecondaryRequestDetailsInterface) {

    console.log({totalProducts})
    const NoMoreProductToShow = products.length === totalProducts;

    const columns: ColumnSecondaryConfig<ProductInterface>[] = [
        {
            key: 'Descripcion',
            label: 'Descripcion',
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
                    {
                        item.Familia ?
                        <p style={{ color: "black" }}><span>Familia:</span> {item.Familia}</p> :
                        <Tag color='green'>Sin Familia</Tag>
                    }
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
                    {
                        item.Cantidad ?
                        <p><span>Cantidad:</span> {item.Cantidad}</p> :
                        <Tag color='red'>Sin Cantidad</Tag>
                    }

                </>
            )
        },
    ];

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
           //onClick={(item) => handleSelectRequest(item)}
        />
    )
}
