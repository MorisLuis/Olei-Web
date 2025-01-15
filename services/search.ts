import { api } from "@/api/api";

export const searchFamilia = async (searchTerm: string) => {
    try {
        const { data } = await api.get(`/api/search/familias?searchTerm=${searchTerm}`);
        return data;
    } catch (error) {
        return { error: error };
    }
}

export const searchMarcas = async (searchTerm: string) => {
    try {
        const { data } = await api.get(`/api/search/marcas?searchTerm=${searchTerm}`);
        return data;
    } catch (error) {
        return { error: error };
    }
}