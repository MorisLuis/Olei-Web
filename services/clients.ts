import { api } from "@/api/api"
import ClientInterface from "@/interfaces/client"

export const getClients = async (term: string): Promise<{ clients: ClientInterface[] }> => {

    const { data: { clients } } = await api.get<{ clients: ClientInterface[] }>(`/api/client/search?term=${term}`);
    return { clients };
}

export const postClient = async (client: ClientInterface) => {

    try {
        const { data } = await api.post("/api/client", client)
        return data.token;
    } catch (error) {
        return { error: error };
    }

}
