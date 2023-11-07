import React, { useContext, useEffect, useState } from 'react';
import styles from "../../../styles/UI.module.scss";

import { ProductSquareCard } from '@/components/Cards/ProductSquareCard';
import { CartContext } from '@/context';
import ProductInterface from '@/interfaces/product';
import { MessageCard } from '@/components/Cards/MessageCard';
import ButtonAnimated from '@/components/Buttons/ButtonAnimated';
import GridSkeleton from '@/components/Skeletons/GridSkeleton';

interface Props {
    data: ProductInterface[],
    loadMoreProducts: () => Promise<void>,
    isLoading: boolean,
    loadingData: boolean
}

const Grid = ({ data, loadMoreProducts, isLoading, loadingData }: Props) => {

    const { cart, cartPending } = useContext(CartContext)
    const [productsToDisplay, setProductsToDisplay] = useState<ProductInterface[]>([])

    useEffect(() => {
        setProductsToDisplay([...data])
    }, [data])

    // Define an array of ProductInterface objects to represent products to be displayed
    const productsWithCartInfo: ProductInterface[] = productsToDisplay.map((product: ProductInterface) => {
        // Find the corresponding product in the 'cart' array using matching properties
        const cartProduct = cart.find((cartItem) => (cartItem.Codigo === product.Codigo) && (cartItem.Id_Marca === product.Id_Marca));

        // Find the corresponding product in the 'cartPending' array using matching properties
        const cartProductPending = cartPending.find((cartItemPending) => (cartItemPending.Codigo === product.Codigo) && (cartItemPending.Id_Marca === product.Id_Marca));

        // Calculate the quantity of the product in the active cart ('cart') and pending cart ('cartPending')
        const quantity = cartProduct !== undefined ? cartProduct.Piezas : 0;
        const quantityPending = cartProductPending !== undefined ? cartProductPending.Piezas : 0;

        // Create a new object that combines the product information with the calculated quantities
        // If 'quantity' from 'cart' is available, use it; otherwise, use 'quantityPending' from 'cartPending'

        const productWithCartInfo: ProductInterface = {
            ...product,
            Piezas: quantity !== 0 ? quantity : quantityPending,
        };

        return productWithCartInfo;
    });

    const images = ["/OleiImageTest/Buje.jpeg", "/OleiImageTest/rotula.jpeg", "/OleiImageTest/terminal.jpeg", "/OleiImageTest/tornilloEstabilizador.jpeg", "/OleiImageTest/topeRebote.webp"]


    return (
        <>
            {
                loadingData ?
                    <GridSkeleton />
                    :
                    !loadingData && productsWithCartInfo.length === 0 ?
                        <MessageCard title='No hay coincidencias exactas'>
                            <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
                        </MessageCard>
                        :
                        <>
                            <div className={styles.grid}>

                                <div className={styles.contentGrid}>
                                    {
                                        productsWithCartInfo?.map((product: ProductInterface, index: number) => {
                                            return (
                                                <ProductSquareCard
                                                    product={product}
                                                    key={product.Codigo && (product.Codigo + product.Id_Marca)}
                                                    //image={images}
                                                    index={index}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                {
                                    (productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0) &&
                                    <div className={styles.loadMore}>
                                        <ButtonAnimated
                                            onclick={loadMoreProducts}
                                            disabled={isLoading}
                                        />
                                    </div>
                                }
                            </div>
                            {
                                !(productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0) &&
                                <p style={{ textAlign: "center", paddingTop: "1em", color: "gray" }}>Ya no hay mas productos, cambia los filtros para ver otros resultados</p>
                            }
                        </>
            }
        </>

    )
}

export default Grid
