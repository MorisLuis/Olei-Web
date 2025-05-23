import React, { useContext, useState } from 'react';

import { ClientContext } from '@/context';
import { ModalSearch } from '../../Modals/ModalSearch';
import ClientInterface from '@/interfaces/client';
import { LeftSection } from './LeftSection';
import { RightSection } from './RightSection';
import { ModalMessage } from '@/components/Modals/ModalMessage';
import { capitalizarTexto } from '@/utils/textCapitalize';
import { useRouter } from 'next/router';
import { getClients } from '@/services/clients';
import useErrorHandler from '@/hooks/useErrorHandler';

import styles from "./../../../styles/Navigation/Header.module.scss";

interface Props {
    setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
    setOpenModalCart,
    setOpenModalMenu
}: Props) => {

    const { pathname, push } = useRouter()
    const { selectClient, setClientChanged } = useContext(ClientContext);
    const { handleError } = useErrorHandler()

    const [modalClientsVisible, setModalClientsVisible] = useState(false);
    const [openModalMessage, setOpenModalMessage] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientInterface>();
    const [changingClient, setChangingClient] = useState(false)


    // Clients
    const onSelectClient = (client: ClientInterface) => {
        setSelectedClient(client);
        setOpenModalMessage(true);
    }

    const onAcceptClientSelected = async () => {
        if (!selectedClient) return;
        setChangingClient(true)
        await selectClient(selectedClient)
        setTimeout(() => {
            setClientChanged(true);
            setOpenModalMessage(false);
            push(`/products`);
            setChangingClient(false);
            setTimeout(() => {
                setClientChanged(false);
            }, 300)
        }, 300);
    }

    const onInputClientChange = async (term: string) => {
        const { clients } = await getClients(term);
        return { clients };
    }

    const handleCloseModal = () => {
        setOpenModalMessage(false);
        setSelectedClient(undefined);
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.content}>
                    <LeftSection
                        setModalClientsVisible={setModalClientsVisible}
                    />
                    {
                        pathname !== '/privacy' &&
                        <RightSection
                            setOpenModalMenu={setOpenModalMenu}
                            setOpenModalCart={setOpenModalCart}
                        />
                    }
                </div>
            </div>

            <ModalSearch
                visible={modalClientsVisible}
                onClose={() => setModalClientsVisible(false)}
                onSelectItem={onSelectClient}
                onInputChange={onInputClientChange}
            />

            <ModalMessage
                visible={openModalMessage}
                onClose={handleCloseModal}
                onAccept={onAcceptClientSelected}
                disabled={changingClient}
                title={`Seleccionar a ${capitalizarTexto(selectedClient?.Nombre as string)} como cliente.`}
            >
                Podras volver a seleccionar después.
            </ModalMessage>
        </>
    )
}

export default Header
