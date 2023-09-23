import ClientInterface from "@/interfaces/client";
import { createContext, Dispatch, SetStateAction } from "react";


interface ContextProps {
    client: ClientInterface;
    clientChanged: boolean;
    selectClient: (client: ClientInterface) => void;
    setClientChanged: Dispatch<SetStateAction<boolean>>
}

export const ClientContext = createContext({} as ContextProps)