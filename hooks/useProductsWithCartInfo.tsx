import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product'
import { useContext, useEffect, useState } from 'react'
import useErrorHandler from './useErrorHandler';

export const useProductsWithCartInfo = (data: ProductInterface[]) => {

    const { cart, cartPending } = useContext(CartContext);
    const [productsToDisplay, setProductsToDisplay] = useState<ProductInterface[]>([])
    const { handleError } = useErrorHandler()

    useEffect(() => {
        getData()
    }, [data])

    const getData = () => {
        /* @ts-ignore */
        if(data.error) { /* @ts-ignore */
            return handleError(data.error);
        };
        setProductsToDisplay([...data])
    }

    // Define an array of ProductInterface objects to represent products to be displayed
    const productsWithCartInfo: ProductInterface[] = productsToDisplay.map((product: ProductInterface) => {
        // Find the corresponding product in the 'cart' array using matching properties
        const cartProduct = cart.find((cartItem) => (cartItem.Codigo === product.Codigo) && (cartItem.Id_Marca === product.Id_Marca));

        // Find the corresponding product in the 'cartPending' array using matching properties
        const cartProductPending = cartPending.find((cartItemPending) => (cartItemPending.Codigo === product.Codigo) && (cartItemPending.Id_Marca === product.Id_Marca));

        // Calculate the quantity of the product in the active cart ('cart') and pending cart ('cartPending')
        const quantity = cartProduct !== undefined ? cartProduct.Cantidad : 0;
        const quantityPending = cartProductPending !== undefined ? cartProductPending.Cantidad : 0;

        // Create a new object that combines the product information with the calculated quantities
        // If 'quantity' from 'cart' is available, use it; otherwise, use 'quantityPending' from 'cartPending'

        const productWithCartInfo: ProductInterface = {
            ...product,
            Cantidad: quantity !== 0 ? quantity : quantityPending,
        };

        return productWithCartInfo;
    });

    return {
        productsWithCartInfo
    }
}
