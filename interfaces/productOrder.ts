export default interface ProductOrderInterface {

    Precio: number,
    Cantidad: number,
    Subtotal: number,
    Impuesto: number,
    Total: number,

    Id_Almacen: number,
    Id_Vendedor: number,
    Id_Formapago: string,
    Id_Marca: number,
    Id_ListaPrecios: number,
    Id_Cliente: number,

    Folio: number,
    Fecha: string
}