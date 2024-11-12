import { useContext, useEffect, useReducer, useState } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from '../index';
import ProductInterface from '@/interfaces/product';
import { AuthContext } from '@/context';
import useErrorHandler from '@/hooks/useErrorHandler';

export interface CartState {
    cart: ProductInterface[];
    cartPending: ProductInterface[];
    numberOfItems: number;
    total: number;
    subTotal: number;
    numberOfItemsPending: number;
    subTotalPending: number;
    totalPending: number;
}


const CART_INITIAL_STATE: CartState = {
    cart: [],
    cartPending: [],
    numberOfItems: 0,
    subTotal: 0,
    total: 0,

    numberOfItemsPending: 0,
    subTotalPending: 0,
    totalPending: 0,

}

export const CartProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
    const [productDelete, setProductDelete] = useState(false)
    const { handleError } = useErrorHandler()
    const { user } = useContext(AuthContext);
    const productWithTaxInPrice = user?.PrecioIncIVA === 1

    // Get the cart in refresh page
    useEffect(() => {
        if (Cookie.get('cart') === "[]") return;

        try {
            const cookieProducts: ProductInterface[] = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
            handleError(error);
        }

    }, []);

    // Get the cart pending in refresh page
    useEffect(() => {
        if (Cookie.get('cartPending') === "[]") return;

        try {
            const cookieProducts: ProductInterface[] = Cookie.get('cartPending') ? JSON.parse(Cookie.get('cartPending')!) : []
            dispatch({ type: '[CartPending] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[CartPending] - LoadCart from cookies | storage', payload: [] });
            handleError(error);
        }
    }, []);

    // Set cart to cookie every state.cart or state.cartPending change.
    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
        Cookie.set('cartPending', JSON.stringify(state.cartPending));
    }, [state.cart, state.cartPending]);

    // Change orderSummary ( numberOfItems, total, subTotal ).
    useEffect(() => {

        const numberOfItems = state.cart.reduce((prev, current: ProductInterface) => {
            if (!current.Existencia) return prev;
            if (current?.Existencia >= 1) {
                return current?.Cantidad + prev;
            }
            return prev;
        }, 0);


        const total = state.cart.reduce((prev, current: ProductInterface) => {
            if (current?.Existencia >= 1) {
                if (productWithTaxInPrice) {
                    return prev + (current.Precio * current.Cantidad);
                } else {
                    const Impuesto = (current.Precio * current.Cantidad) * ((current.Impuesto ?? 0)/100)
                    return prev + (current.Precio * current.Cantidad) + Impuesto;
                }
            }
            return prev;

        }, 0);


        const subTotal = state.cart.reduce((prev, current: ProductInterface) => {

            if (current?.Existencia >= 1) {
                if (productWithTaxInPrice) {
                    const Impuesto = (current.Precio * current.Cantidad) * ((current.Impuesto ?? 0)/100)
                    return prev + (current.Precio * current.Cantidad) - Impuesto;
                } else {
                    return prev + (current.Precio * current.Cantidad);
                }
            }
            return prev;

        }, 0);

        const orderSummary = {
            numberOfItems,
            total,
            subTotal
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);

    // Change orderSummary of cart pending ( numberOfItems, total, subTotal ).
    useEffect(() => {

        const numberOfItemsPending = state.cartPending.reduce((prev, current: ProductInterface) => {
            return current?.Cantidad + prev;
        }, 0);

        const subTotalPending = state.cartPending.reduce((prev, current: ProductInterface) => {
            return prev + current.Precio * current.Cantidad;
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItemsPending,
            subTotalPending,
            totalPending: subTotalPending * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cartPending]);



    // Functions
    const addProductToCart = (product: ProductInterface) => {

        if (product.Existencia && product.Existencia <= 0) {
            const productInCartPending = state.cartPending.some(p => p.Codigo === product.Codigo);
            if (!productInCartPending) {
                return dispatch({ type: '[CartPending] - Update products in cartPending', payload: [...state.cartPending, product] })
            }

            const productInCartPendingAndSameMarca = state.cartPending.some(p => p.Codigo === product.Codigo && p.Id_Marca === product.Id_Marca);
            if (!productInCartPendingAndSameMarca) {
                return dispatch({ type: '[CartPending] - Update products in cartPending', payload: [...state.cartPending, product] })
            }

            const updatedProducts = state.cartPending.map((p: ProductInterface) => {
                if (p.Codigo !== product.Codigo) return p;
                if (p.Id_Marca !== product.Id_Marca) return p;

                p.Cantidad = product.Cantidad;
                return p;
            });

            return dispatch({ type: '[CartPending] - Update products in cartPending', payload: updatedProducts })

        } else {
            const productInCart = state.cart.some(p => p.Codigo === product.Codigo);
            if (!productInCart) {
                return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })
            }

            const productInCartAndSameMarca = state.cart.some(p => p.Codigo === product.Codigo && p.Id_Marca === product.Id_Marca);
            if (!productInCartAndSameMarca) {
                return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })
            }

            const updatedProducts = state.cart.map((p: ProductInterface) => {
                if (p.Codigo !== product.Codigo) return p;
                if (p.Id_Marca !== product.Id_Marca) return p;

                p.Cantidad = product.Cantidad;
                return p;
            });

            dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });
        }
    }

    const addOrderToCart = (products: ProductInterface[]): Promise<void> => {

        //Simulate a promise to react hot toas. We dont really need a promise.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isSuccess = true;
                if (isSuccess) {
                    dispatch({ type: '[Cart] - Update products in cart', payload: products });
                    resolve();
                } else {
                    reject(new Error("Something went wrong"));
                }
            }, 2000);
        });
    };

    const addOrderToCartPending = (products: ProductInterface[]): Promise<void> => {
        //Simulate a promise to react hot toas. We dont really need a promise.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isSuccess = true;
                if (isSuccess) {
                    dispatch({ type: '[CartPending] - Update products in cartPending', payload: products });
                    resolve();
                } else {
                    reject(new Error("Something went wrong"));
                }
            }, 2000);
        });
    };

    const removeCartProduct = (product: ProductInterface) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    const removeAllCart = () => {
        dispatch({ type: '[Cart] - Remove All cart', payload: [] });
    }

    const removeCartProductPending = (product: ProductInterface) => {
        dispatch({ type: '[CartPending] - Remove product in cartPending', payload: product });
    }


    return (
        <CartContext.Provider value={{
            ...state,
            productDelete,

            // Methods
            addProductToCart,
            removeCartProduct,
            addOrderToCart,
            removeAllCart,

            removeCartProductPending,
            addOrderToCartPending,

            setProductDelete,
        }}>
            {children}
        </CartContext.Provider>
    )
};