import { FiltersContext } from "@/context";
import { useContext } from "react";

export const useCreateQuery = () => {
    let query = "/products";
    const { filters } = useContext(FiltersContext);

    const executeQuery = () => {

        // Array que contendrá cada parte de la query
        const queryParts: string[] = [];

        // Agrega los filtros solo si existen y son válidos
        if (filters?.enStock === true) {
            queryParts.push('enStock=true');
        }
        if (filters.familia) {
            queryParts.push(`familia=${filters.familia}`);
        }
        if (filters.folio) {
            queryParts.push(`folio=${filters.folio}`);
        }
        if (filters.marca) {
            queryParts.push(`marca=${filters.marca}`);
        }
        if (filters.nombre) {
            queryParts.push(`nombre=${filters.nombre}`);
        }

        // Si hay partes en queryParts, únelas usando `&`, con `?` al inicio
        if (queryParts.length > 0) {
            query += `?${queryParts.join('&')}`;
        }

        return query;
    }

    return { executeQuery };
}
