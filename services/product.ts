import { api } from '@/api/api';
import FiltersInterface from '@/interfaces/filters';

export const getProducts = async (query: any, nextPage?: number) => {

    try {
        const { nombre, enStock, marca, folio, familia } = query;
        let url = `api/product?page=${nextPage ? nextPage : 1}&limit=10&nombre=${nombre}&enStock=${enStock}&marca=${marca}&folio=${folio}&familia=${familia}`;
        const { data } = await api.get(url);
        return data.products;
    } catch (error) {
        return { error: error };
    }

}

type getProductById = {
    Codigo: String;
    Marca: String
}

export const getProductById = async ({ Codigo, Marca }: getProductById) => {

    try {
        const { data } = await api.get(`/api/product/web/${Codigo}?Marca=${Marca}`);
        return data;
    } catch (error) {
        return { error: error };
    }

}


export const getTotalProducts = async (query: FiltersInterface) => {

    try {
        const { nombre, enStock, marca, folio, familia } = query;
        let url = `/api/product/count`;

        // Crea un array para almacenar los parámetros
        const params: string[] = [];

        // Agrega los parámetros si existen
        if (nombre) params.push(`nombre=${nombre}`);
        if (enStock) params.push(`enStock=${enStock}`);
        if (marca !== undefined) params.push(`marca=${marca}`);
        if (folio) params.push(`folio=${folio}`);
        if (familia) params.push(`familia=${familia}`);

        // Si hay parámetros, los agregamos a la URL con '?', si no, se queda sin parámetros
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        const { data } = await api.get(url);
        return data.total;
    } catch (error) {
        return { error: error };
    }

};

interface searchProductsInterface {
    term: string;
    filters: FiltersInterface
}

export const searchProducts = async ({
    term,
    filters
}: searchProductsInterface) => {

    try {
        const { enStock, marca, folio, familia } = filters;
        let url = `api/product/search?nombre=${term}&enStock=${enStock}&marca=${marca}&folio=${folio}&familia=${familia}`;
        const { data } = await api.get(url);

        return data.products;
    } catch (error) {
        return { error: error };
    }

}
