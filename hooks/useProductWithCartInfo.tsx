import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product'
import React, { useContext, useEffect, useState } from 'react'

export const useProductWithCartInfo = (data: ProductInterface) => {
    const { cart, cartPending } = useContext(CartContext);
    const [productWithCartInfo, setProductWithCartInfo] = useState<ProductInterface | undefined>(undefined);

    useEffect(() => {
        // En este punto, `data` ya está disponible y podemos calcular `productWithCartInfo`
        const cartProduct = cart.find((cartItem) => (cartItem.Codigo === data?.Codigo) && (cartItem.Id_Marca === data?.Id_Marca));
        const cartProductPending = cartPending.find((cartItemPending) => (cartItemPending.Codigo === data?.Codigo) && (cartItemPending.Id_Marca === data?.Id_Marca));

        const quantity = cartProduct !== undefined ? cartProduct.Cantidad : 0;
        const quantityPending = cartProductPending !== undefined ? cartProductPending.Cantidad : 0;

        const updatedProductWithCartInfo: ProductInterface = {
            ...data,
            Cantidad: quantity !== 0 ? quantity : quantityPending,
        };

        setProductWithCartInfo(updatedProductWithCartInfo);
    }, [data, cart, cartPending]);

    return {
        productWithCartInfo: productWithCartInfo || {} as ProductInterface,
    };
};
