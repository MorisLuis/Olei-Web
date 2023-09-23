
export default interface OrderInterface {
    Piezas: number,
    Subtotal: number,
    Impuesto: number,

    Total?: number,
    Fecha?: string,
    Entregado?: boolean,
    Cliente?: string,
    Vendedor?: string,
    Folio?: string
}
