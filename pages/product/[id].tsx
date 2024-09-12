import React, { useEffect, useState } from 'react';
import styles from './../../styles/Pages/ProductDetails.module.scss';

import { useRouter } from 'next/router';
import { Layout } from '@/components/Layouts/Layout';
import ProductInterface from '@/interfaces/product';
import { ProductDetailsRender } from '@/components/Renders/ProductDetailsRender';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProductById } from '@/services/product';

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
        <Layout>
            <div className={styles.pageDetails}>
                <section className={styles.page}>
                    <div onClick={handleGoBack} className={styles.back}>
                        <FontAwesomeIcon icon={faArrowLeftLong} className={`icon__small`} />
                        <p>Regresar</p>
                    </div>
                    <ProductDetailsRender product={product as ProductInterface} />
                </section>
            </div>
        </Layout>
    )
}

export default ProductDetails;