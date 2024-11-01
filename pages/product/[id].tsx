import React, { useEffect, useState } from 'react';
import styles from './../../styles/Pages/ProductDetails.module.scss';

import { useRouter } from 'next/router';
import ProductInterface from '@/interfaces/product';
import { ProductDetailsRender } from '@/components/Renders/ProductDetailsRender';
import { getProductById } from '@/services/product';
import LayoutContentSecondary from '@/components/Layouts/LayoutContentSecondary';

const ProductDetails = () => {

    const { push, query: { Marca, id} } = useRouter();
    const [product, setProduct] = useState<ProductInterface>()

    const handleGoBack = () => {
        push('/products');
    }

    useEffect(() => {
        if(typeof id !== "string") return;
        if(typeof Marca !== "string") return;

        const handleGetProduct = async () => {
            const productData = await getProductById({Codigo: id, Marca});
            setProduct(productData)
        }

        handleGetProduct()
    }, [Marca, id])

    return (
        <LayoutContentSecondary
            onBack={handleGoBack}
            backText='Regresar'
        >
            <div className={styles.pageDetails}>
                <section className={styles.page}>
                    <ProductDetailsRender product={product as ProductInterface} />
                </section>
            </div>
        </LayoutContentSecondary>
    )
}

export default ProductDetails;