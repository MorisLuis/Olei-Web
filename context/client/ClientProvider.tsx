import ClientInterface from "@/interfaces/client";
import Cookies from "js-cookie";
import { useEffect, useReducer } from "react";
import { ClientContext } from "./ClientContext"
import { clientReducer } from "./clientReducer";

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

    useEffect(() => {
        const cookie = JSON.parse(Cookies.get('client') || "")

        if(cookie.Id_Almacen  === null || cookie.Id_Cliente === null ) return;

        try {
            const cookieClient = Cookies.get('client') ? JSON.parse(Cookies.get('client')!) : []
            dispatch({ type: '[Client] - selectClient', payload: cookieClient })
        } catch (error) {
            dispatch({ type: '[Client] - selectClient', payload: CLIENT_INITIAL_STATE.client })
        }
    }, [])

    useEffect(() => {
        Cookies.set('client', JSON.stringify(state.client));
    }, [state]);

    const selectClient = (client: ClientInterface) => {
        dispatch({ type: '[Client] - selectClient', payload: client })
    }


    return (
        <ClientContext.Provider
            value={{
                ...state,

                // Methods
                selectClient
            }}
        >
            {children}
        </ClientContext.Provider>
    )
};