import OrderInterface from '@/interfaces/Order';
import { ProductCartInterface } from '@/interfaces/productCart';
import { CartState } from '../index';


type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ProductCartInterface[] }
    | { type: '[Cart] - Update products in cart', payload: ProductCartInterface[] }
    | { type: '[Cart] - Change cart quantity', payload: ProductCartInterface }
    | { type: '[Cart] - Remove product in cart', payload: ProductCartInterface }
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
                cart: state.cart.map((product: ProductCartInterface) => {
                    if (product.CodigoProducto !== action.payload.CodigoProducto) return product;
                    return action.payload;
                })
            }

        case '[Cart] - Remove product in cart':
            return {
                ...state,
                cart: state.cart.filter((product: ProductCartInterface) => !(product.CodigoProducto === action.payload.CodigoProducto && product.Id_Marca === action.payload.Id_Marca))
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