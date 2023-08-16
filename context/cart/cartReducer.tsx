import OrderInterface from '@/interfaces/order';
import ProductInterface from '@/interfaces/product';
import { CartState } from '../index';


type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ProductInterface[] }
    | { type: '[Cart] - Update products in cart', payload: ProductInterface[] }
    | { type: '[Cart] - Change cart quantity', payload: ProductInterface }
    | { type: '[Cart] - Remove product in cart', payload: ProductInterface }
    | { type: '[Order] - Create order', payload: OrderInterface }
    | {
        type: '[Cart] - Update order summary',
        payload: {
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        }
    }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - Update products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map((product: ProductInterface) => {
                    if (product.CodigoProducto !== action.payload.CodigoProducto) return product;
                    return action.payload;
                })
            }

        case '[Cart] - Remove product in cart':
            return {
                ...state,
                cart: state.cart.filter((product: ProductInterface) => !(product.CodigoProducto === action.payload.CodigoProducto && product.Id_Marca === action.payload.Id_Marca))
            }

        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }

}