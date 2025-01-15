export default interface FiltersInterface {
    nombre: string,
    marca: string,
    familia: string,
    folio: string,
    enStock: boolean
}

export type FiltersLabelType = "Nombre" | "Marca" | "Familia" | "Folio" | "EnStock"
export const validFiltersLabel: FiltersLabelType[] = ["Nombre", "Marca", "Familia", "Folio", "EnStock"];
