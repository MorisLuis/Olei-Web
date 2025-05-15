import { api } from "@/api/api";
import OrderInterface from "@/interfaces/order";
import ProductInterface from "@/interfaces/product";
import { SellsDetailsInterface } from "@/interfaces/sells";
import { AxiosError } from "axios";

interface postOrderInterface {
    subTotal: number,
    total: number,
    numberOfItems: number,
    cart: ProductInterface[]
};

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

    } catch (error) {
        return { error: { ...error as AxiosError } };
    }

}

export const getOrders = async (page?: number) => {
    try {
        const { data } = await api.get(`/api/order/all?page=${page ?? 1}&limit=5`);
        const order = data;
        return order
    } catch (error) {
        return { error: { ...error as AxiosError } };
    }

}

export const getOrder = async (receipt: string) => {
    try {
        const { data } = await api.get(`/api/order/${receipt}`);
        const order = data;
        return order;
    } catch (error) {
        return { error: { ...error as AxiosError } };
    }
}

export const getOrderDetails = async (receipt: string, page?: number) => {

    const { data: { orderDetails } } = await api.get(`/api/order/details?folio=${receipt}&PageNumber=${page}`);
    return orderDetails ?? [];

}

export const getTotalOrders = async () => {
    try {
        const { data } = await api.get(`/api/order/all/count`);
        const total = data;
        return total.total;
    } catch (error) {
        return { error: { ...error as AxiosError } };
    }
};

export const getTotalOrderDetails = async (receipt: string) => {
    try {
        const { data } = await api.get(`/api/order/details/total?folio=${receipt}`);
        const totalOrderDetails = data;
        return totalOrderDetails.total;
    } catch (error) {
        return { error: { ...error as AxiosError } };
    }
} 