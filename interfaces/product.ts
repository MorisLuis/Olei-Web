export default interface ProductInterface {

    Descripcion: string;
    Id_Familia?: number
    Codigo: string;
    Familia?: string;
    CodigoPrecio?: string;
    Precio: number;
    CodigoExsitencia?: string;
    Existencia: number;
    Id_Almacen?: number;
    Marca?: string;
    Id_Marca?: number;
    Id_ListaPrecios?: number;
    Piezas: number;
    Impuesto?: any;
    Importe?: any;
    imagen?: string[];
    Observaciones?:string;
}