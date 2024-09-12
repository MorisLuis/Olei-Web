import React from 'react';
import styles from "../../styles/Pages/Request.module.scss";
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import ModalRequest from '@/components/Modals/Modal';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';
import { MessageCard } from '@/components/Cards/MessageCard';

const PedidosAnteriores = () => {

    const { query, back } = useRouter()

    return (
        <>
            <LayoutProfile>
                <div className={styles.request}>
                    <section className={styles.info}>
                        <MessageCard
                            title="No hay pedidos anteriores"
                        >
                            No hay pedidos anteriores en este momento, apareceran una vez que hagas pedidos.
                        </MessageCard>
                    </section>
                </div>
            </LayoutProfile>

            <ModalRequest
                visible={query.receipt ? true : false}
                title="Recibo"

                //Conditions
                receipt
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
