import ProductInterface from '@/interfaces/product';
import { createContext } from 'react';


interface ContextProps {
    cart: ProductInterface[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    // Methods
    addProductToCart: (product: ProductInterface) => void;
    removeCartProduct: (product: ProductInterface) => void;
    addOrderToCart: (product: ProductInterface[]) => void;
}


export const CartContext = createContext({} as ContextProps );