import React, { useEffect } from 'react';

import LayoutProfile from '@/components/Layouts/LayoutProfile';
import { MessageCard } from '@/components/Cards/MessageCard';
import { TableSecondarySkeleton } from '@/components/Skeletons/TableSecondarySkeleton';
import { getOrders, getTotalOrders } from '@/services/order';
import TableSecondaryRequest from '@/components/Ui/Tables/TableComponents/TableSecondaryRequest';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';

const Pedidos = () => {

    const { data, isLoading, isButtonLoading, total, handleResetData, handleLoadMore } = useLoadMoreData(
        {
            fetchInitialData: () => getOrders(),
            fetchPaginatedData: (arg, nextPage) => getOrders(nextPage),
            fetchTotalCount: () => getTotalOrders(),
        }
    );

    useEffect(() => {
        handleResetData()
    }, [handleResetData])

    if (!data) {
        return (
            <LayoutProfile titleLP='Pedidos'>
                <TableSecondarySkeleton body={[2, 2, 2]} />
            </LayoutProfile>
        )
    }

    if (data.length < 0) {
        return (
            <MessageCard title="No hay pedidos actuales">
                No hay pedidos actuales en este momento, apareceran una vez que hagas pedidos.
            </MessageCard>
        )
    }

    return (
            <LayoutProfile
                titleLP='Pedidos'
                headerContent={{
                    title: "Pedidos actuales",
                    subtitle: "Para cambiar la información, habla con tu administrador."
                }}
            >
                <TableSecondaryRequest
                    products={data}
                    totalProducts={total ?? 0}
                    buttonIsLoading={isButtonLoading}
                    loadMoreProducts={handleLoadMore}
                    loadingData={isLoading}
                />
            </LayoutProfile>

    )
}

export default Pedidos
