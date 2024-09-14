import { api } from "@/api/api";
import { ParsedUrlQuery } from "querystring";



export const searchProducts = async (term: string, query: ParsedUrlQuery) => {


    
    try {
        let url = `/api/search?nombre=${term}`
        const { nombre, enStock, marca, folio, familia } = query;
    
        if (nombre) url += `&nombre=${nombre}`;
        if (enStock) url += `&enStock=${enStock}`;
        if (marca !== undefined) url += `&marca=${marca}`;
        if (folio) url += `&folio=${folio}`;
        if (familia) url += `&familia=${familia}`;
        const { data: { products } } = await api.get(`${url}`);
        return products;
    } catch (error) {
        return { error: error };
    }

}

