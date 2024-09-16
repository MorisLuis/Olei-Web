import { api } from "@/api/api"
import ClientInterface from "@/interfaces/client"

export const getClients = async (term: string) => {

    try {
        const cookies = document.cookie;
        console.log({cookies})

        const { data: { Clients } } = await api.get(`/api/search/client?term=${term}`);
        return Clients;
    } catch (error) {
        return { error: error };
    }

}



export const postClient = async (client: ClientInterface) => {

    try {
        const { data } = await api.post("/api/client", client)
        return data.token;
    } catch (error) {
        return { error: error };
    }

}
