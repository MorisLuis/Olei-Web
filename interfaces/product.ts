export default interface ProductInterface {

    Precio: number,
    Cantidad: number
    Subtotal?: number,
    Impuesto?: number,
    Total?: number,

    Id_Almacen?: number,
    Id_Vendedor?: number,
    Id_Formapago?: string,
    Id_Marca?: number,
    Id_ListaPrecios?: number,
    Id_Cliente?: number,
    Id_Familia?: number,

    Folio?: string,
    Fecha?: string

    Descripcion?: string,
    CodigoProducto?: string,
    Familia?: string,
    CodigoPrecio?: string,
    CodigoExsitencia?: string,
    Existencia?: number,
    Marca?: string,
}