export interface ProductCartInterface {

    Descripcion: string,
    CodigoProducto: string,

    Id_Familia: number
    Familia: string,

    Precio: number,
    CodigoPrecio?: string,

    Existencia?: number,
    CodigoExsitencia?: string,

    Marca: string,
    Id_Marca: number
    
    Id_Almacen?: number,
    Id_ListaPrecios?: number

    Cantidad?: number


}