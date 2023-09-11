import ClientInterface from "@/interfaces/client";
import { createContext } from "react";


interface ContextProps {
    client: ClientInterface;
    selectClient: (client: ClientInterface) => void;
}

export const ClientContext = createContext({} as ContextProps)