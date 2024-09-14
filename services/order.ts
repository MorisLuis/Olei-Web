import { api } from "@/api/api";
import OrderInterface from "@/interfaces/order";
import ProductInterface from "@/interfaces/product";

interface postOrderInterface {
    subTotal: number,
    total: number,
    numberOfItems: number,
    cart: ProductInterface[]
}

export const postOrder = async ({
    subTotal,
    total,
    numberOfItems,
    cart
}: postOrderInterface) => {

    if (!total || !subTotal) {
        throw new Error('Total y Subtotal son requeridos para procesar la orden');
    }

    const sellsData: OrderInterface = {
        Total: total,
        Cantidad: numberOfItems,
        Subtotal: subTotal
    }

    try {
        const sellsDetails: ProductInterface[] = cart.map((product: ProductInterface) => {
            const productDetails: ProductInterface = {
                Codigo: product.Codigo,
                Id_Marca: product?.Id_Marca,
                Cantidad: product.Cantidad,
                Precio: product.Precio,
                Descripcion: product.Descripcion,

                Impuesto: product.Impuesto,
                Existencia: product.Existencia
            };
            return productDetails;
        })

        const folioData = await api.post('/api/order', { sellsData, sellsDetails });
        const folio = folioData.data.folio;
        return folio;

    } catch (error: any) {
        return { error: error };
    }

}

export const getOrders = async () => {

    console.log("getOrders")
    try {
        const { data } = await api.get(`/api/order/all`);
        const order = data;
        return order
    } catch (error: any) {
        return { error: error };
    }

}

export const getOrder = async (receipt: string) => {
    try {
        const { data } = await api.get(`/api/order/${receipt}`);
        const order = data;
        return order;
    } catch (error: any) {
        return { error: error };
    }
}

export const getOrderDetails = async (receipt: string) => {
    try {
        const { data } = await api.get(`/api/order/details?folio=${receipt}`);
        const orderDetails = data;
        return orderDetails;
    } catch (error: any) {
        return { error: error };
    }
} 