export default interface FiltersInterface {
    nombre?: string,
    marca?: string,
    familia?: string,
    folio?: string,
    enStock?: boolean
}

export type FilterType = "Nombre" | "Marca" | "Familia" | "Folio" | "EnStock"