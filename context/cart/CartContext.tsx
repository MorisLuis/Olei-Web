import { ProductCartInterface } from '@/interfaces/productCart';
import { createContext } from 'react';


interface ContextProps {
    cart: ProductCartInterface[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    // Methods
    addProductToCart: (product: ProductCartInterface) => void;
    updateCartQuantity: (product: ProductCartInterface) => void;
    removeCartProduct: (product: ProductCartInterface) => void;
}


export const CartContext = createContext({} as ContextProps );