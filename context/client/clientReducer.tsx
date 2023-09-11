import ClientInterface from "@/interfaces/client";
import { ClientState } from "./ClientProvider"

type ClientActionType =
    | { type: '[Client] - selectClient', payload: ClientInterface }


export const clientReducer = (state: ClientState, action: ClientActionType): ClientState => {

    switch (action.type) {
        case '[Client] - selectClient':
            return {
                ...state,
                client: {...action.payload}
            }

        default:
            return state;
    }


}