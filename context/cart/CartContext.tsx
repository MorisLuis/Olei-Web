import ProductInterface from '@/interfaces/product';
import { createContext, Dispatch, SetStateAction } from 'react';


interface ContextProps {
    cart: ProductInterface[];
    cartPending: ProductInterface[];
    numberOfItems: number;
    total: number;
    subTotal: number;
    productDelete: boolean;

    numberOfItemsPending: number;
    subTotalPending: number;
    totalPending: number;

    // Methods
    addProductToCart: (product: ProductInterface) => void;
    removeCartProduct: (product: ProductInterface) => void;
    addOrderToCart: (product: ProductInterface[]) => Promise<unknown>
    removeAllCart: () => void;

    removeCartProductPending: (product: ProductInterface) => void;
    addOrderToCartPending: (product: ProductInterface[]) => Promise<unknown>;

    setProductDelete: Dispatch<SetStateAction<boolean>>;

}


export const CartContext = createContext({} as ContextProps );