import React from 'react';
import LayoutProfile from '@/components/Layouts/LayoutProfile';
import ModalRequest from '@/components/Modals/ModalRequest';
import { useRouter } from 'next/router';
import { ReceiptRender } from '@/components/Renders/ReceiptRender';

import styles from "../../styles/Pages/Request.module.scss";
import { MessageCard } from '@/components/Cards/MessageCard';

const PedidosAnteriores = () => {

    const { query, back } = useRouter()

    return (
        <>
            <LayoutProfile>
                <div className={styles.request}>
                    <section className={styles.info}>
                        {/* <div className={styles.header}>
                            <h2>Pedidos Anteriores</h2>
                            <p>Estos son los pedidos que has pedido en otras ocasiones.</p>
                        </div>
                        <div className={styles.item}>
                            <RequestCard />
                        </div> */}

                        <MessageCard
                            title="No hay pedidos anteriores"
                        >
                            No hay pedidos anteriores en este momento, apareceran una vez que hagas pedidos.
                        </MessageCard>
                    </section>
                </div>
            </LayoutProfile>

            <ModalRequest
                visible={query.receipt}
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
