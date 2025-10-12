import React from 'react';
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import ModalRequest from '@/components/Modals/Modal';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/pages/request/components/ReceiptRender';
import { MessageCard } from '@/components/Cards/MessageCard';

const PedidosAnteriores = () => {

    const { query, back } = useRouter()

    return (
        <>
            <LayoutProfile titleLP='Pedidos Anteriores'>
                <MessageCard
                    title="No hay pedidos anteriores"
                >
                    No hay pedidos anteriores en este momento, apareceran una vez que hagas pedidos.
                </MessageCard>
            </LayoutProfile>

            <ModalRequest
                visible={query.receipt ? true : false}
                title="Recibo"

                //Conditions
                actionsVisible

                //Methods
                onClose={() => back()}
            >
                <ReceiptRender />
            </ModalRequest>
        </>

    )
}

export default PedidosAnteriores
