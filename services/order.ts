import { api } from "@/api/api";
import OrderInterface from "@/interfaces/order";
import ProductInterface from "@/interfaces/product";

export const getOrders = async () => {

    try {
        const { data } = await api.get(`/api/order/all`);
        const order: OrderInterface[] = data;
        return order
    } catch (error) {
        console.log({erroGOs: error})
    }

}

export const getOrder = async (receipt: string) => {
    try {        
        const { data } = await api.get(`/api/order/${receipt}`);
        const order: OrderInterface = data;
        return order;
    } catch (error) {
        console.log({erroGO: error})
    }
} 

export const getOrderDetails = async (receipt: string) => {
    try {
        const { data } = await api.get(`/api/orderDetails?folio=${receipt}`);
        const orderDetails: ProductInterface[] = data;
        return orderDetails;
    } catch (error) {
        console.log({erroGOD: error})
    }
} 