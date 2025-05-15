
export interface SellsDetailsInterface {
    Impuesto?: number | null;
    Id_Almacen: number;
    Id_ListaPrecios?: number | null;
    Folio: number;

    Id_Marca: number;
    Precio?: number | null;
    Cantidad?: number | null;
    Importe?: number | null;
    Descripcion?: string | null;
    Codigo: string;

    Marca?: string;
    Unidad?: string;

    TipoDoc: number;
    Serie: string;
    Partida: number;
    Costo?: number | null;
    Id_Unidad?: number | null;
    SwNs?: boolean | null;
    SKU?: string | null;
}