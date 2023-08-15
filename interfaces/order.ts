import ProductOrderInterface from "./productOrder";

export default interface OrderInterface {
    products: ProductOrderInterface[],
    Cantidad: number,
    Subtotal: number,
    Impuesto: number,
    Total: number,
    Folio: number,
    Fecha: string
}
