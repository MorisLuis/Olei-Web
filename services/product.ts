import { api } from '@/api/api';
import { ParsedUrlQuery } from 'querystring';

export const getProducts = async (query: ParsedUrlQuery, nextPage?: number) => {
    const { nombre, enStock, marca, folio, familia } = query;
    let url = `api/product?page=${nextPage ? nextPage : 1}&limit=20`;

    if (nombre) url += `&nombre=${nombre}`;
    if (enStock) url += `&enStock=${enStock}`;
    if (marca !== undefined) url += `&marca=${marca}`;
    if (folio) url += `&folio=${folio}`;
    if (familia) url += `&familia=${familia}`;

    const { data } = await api.get(url);

    return data.products;
}

type getProductById = {
    Codigo: String;
    Marca: String
}

export const getProductById = async ({ Codigo, Marca }: getProductById) => {

    console.log({Codigo, Marca})
    try {
        const { data } = await api.get(`/api/product/web/${Codigo}?Marca=${Marca}`);
        return data;
    } catch (error) {
        console.log({ error })
    }
}


export const getTotalProducts = async (query: ParsedUrlQuery) => {
    const { nombre, enStock, marca, folio, familia } = query;
    let url = `api/product/count`;

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
}
