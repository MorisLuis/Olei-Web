import { useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from '../index';
import ProductInterface from '@/interfaces/product';

export interface CartState {
    cart: ProductInterface[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}


export const CartProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        if (Cookie.get('cart') === "[]") return;

        try {
            const cookieProducts: ProductInterface[] = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            console.log({ error })
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);


    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart]);


    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current: ProductInterface) => {
            if(!current.Existencia)  return prev;
            if (current?.Existencia >= 1) {
                return current?.Cantidad + prev;
            }
            return prev;
        }, 0);

        const subTotal = state.cart.reduce((prev, current: any) => {
            if (current.Existencia >= 1) {
                return prev + current.Precio * current.Cantidad;
            }
            return prev;
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);



    const addProductToCart = (product: ProductInterface) => {

        const productInCart = state.cart.some(p => p.CodigoProducto === product.CodigoProducto);
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        const productInCartAndSameMarca = state.cart.some(p => p.CodigoProducto === product.CodigoProducto && p.Id_Marca === product.Id_Marca);
        if (!productInCartAndSameMarca) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        // Acumular
        const updatedProducts = state.cart.map((p: ProductInterface) => {
            if (p.CodigoProducto !== product.CodigoProducto) return p;
            if (p.Id_Marca !== product.Id_Marca) return p;

            // Actualizar la cantidad 
            p.Cantidad = product.Cantidad;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
    }

    const addOrderToCart = (product: ProductInterface[]) => {
        dispatch({ type: '[Cart] - Update products in cart', payload: product });
    }


    const removeCartProduct = (product: ProductInterface) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }


    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            removeCartProduct,
            addOrderToCart
        }}>
            {children}
        </CartContext.Provider>
    )
};