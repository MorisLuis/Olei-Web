import React, { useContext, useState } from 'react';
import styles from "./../../../styles/Navigation/Header.module.scss";

import { ClientContext } from '@/context';
import { ModalSearch } from '../../Modals/ModalSearch';
import ClientInterface from '@/interfaces/client';
import { LeftSection } from './LeftSection';
import { RightSection } from './RightSection';
import { ModalMessage } from '@/components/Modals/ModalMessage';
import { capitalizarTexto } from '@/utils/textCapitalize';
import { useRouter } from 'next/router';
import { getClients } from '@/services/clients';

interface Props {
    setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenModalMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
    setOpenModalCart,
    setOpenModalMenu
}: Props) => {

    const { pathname, push } = useRouter()
    const { selectClient, setClientChanged } = useContext(ClientContext);

    const [modalClientsVisible, setModalClientsVisible] = useState(false)
    const [openModalMessage, setOpenModalMessage] = useState(false)
    const [selectedClient, setSelectedClient] = useState<ClientInterface | undefined>()


    // Clients
    const onSelectClient = (product: any) => {
        setSelectedClient(product);
        setOpenModalMessage(true);
    }

    const onAcceptClientSelected = () => {
        setClientChanged(true)
        selectClient(selectedClient as ClientInterface)
        setTimeout(() => {
            setClientChanged(false)
        }, 300)
        setOpenModalMessage(false);
        push(`/products`)
    }

    const onInputClientChange = async (term: string) => {
        try {
            const Clients = await getClients(term);
            return { products: Clients };
        } catch (error) {
            console.log({ error })
            return { products: [] };
        }
    }

    const handleCloseModal = () => {
        setOpenModalMessage(false);
        setSelectedClient(undefined);
    }

    return (
        <>
            <div className={`${styles.header}  blur`}>
                <div className={`${styles.content} display-flex space-between`}>
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
                title={`Seleccionar a ${capitalizarTexto(selectedClient?.Nombre as string)} como cliente.`}
            >
                Podras volver a seleccionar después.
            </ModalMessage>
        </>
    )
}

export default Header
