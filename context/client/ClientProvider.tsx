import { api } from "@/api/api";
import ClientInterface from "@/interfaces/client";
import Cookies from "js-cookie";
import { useEffect, useReducer, useState } from "react";
import { ClientContext } from "./ClientContext"
import { clientReducer } from "./clientReducer";
import { postClient } from "@/services/clients";
import useErrorHandler from "@/hooks/useErrorHandler";

export interface ClientState {
    client: ClientInterface
}

const CLIENT_INITIAL_STATE: ClientState = {
    client: {
        Id_Almacen: null,
        Id_Cliente: null,
        Nombre: "Invitado"
    }
}

export const ClientProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(clientReducer, CLIENT_INITIAL_STATE);
    const [clientChanged, setClientChanged] = useState(false)
    const { handleError } = useErrorHandler()

    useEffect(() => {
        const cookieValue = Cookies.get('client');
        let parsedCookie;

        if (cookieValue) {
            try {
                parsedCookie = JSON.parse(cookieValue);
            } catch (error) {
                handleError(error)
            }
        }

        if (parsedCookie?.Id_Almacen === null || parsedCookie?.Id_Cliente === null) return;

        try {
            const cookieClient = Cookies.get('client') ? JSON.parse(Cookies.get('client')!) : []
            dispatch({ type: '[Client] - selectClient', payload: cookieClient })
        } catch (error) {
            dispatch({ type: '[Client] - selectClient', payload: CLIENT_INITIAL_STATE.client });
            handleError(error);
        }
    }, [])

    useEffect(() => {
        Cookies.set('client', JSON.stringify(state.client));
    }, [state]);

    const selectClient = async (client: ClientInterface) => {
        try {
            const token = await postClient(client)
            Cookies.set('token', token);
            dispatch({ type: '[Client] - selectClient', payload: client })
        } catch (error) {
            handleError(error);
        }
    }


    return (
        <ClientContext.Provider
            value={{
                ...state,
                clientChanged,

                // Methods
                selectClient,
                setClientChanged
            }}
        >
            {children}
        </ClientContext.Provider>
    )
};