import UserInterface from '@/interfaces/user';
import { AUTH_INITIAL_STATE, AuthState } from './AuthProvider';


type AuthActionType =
    | { type: '[Auth] - Login', payload: any }
    | { type: '[Auth] - Update User', payload: Partial<UserInterface> }
    | { type: '[Auth] - Logout', user: UserInterface }


export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case '[Auth] - Update User':
            return {
                ...state,
                user: {
                    ...state.user as UserInterface,
                    PrecioIncIVA: action.payload.PrecioIncIVA as number
                }
            }

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: action.user
            }

        default:
            return state;
    }

}