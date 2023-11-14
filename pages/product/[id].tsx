import React from 'react';
import styles from './../../styles/Pages/ProductDetails.module.scss';

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/Layouts/Layout';
import ProductInterface from '@/interfaces/product';
import { api } from '@/api/api';
import { ProductDetailsRender } from '@/components/Renders/ProductDetailsRender';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductDetails = (productProps: ProductInterface) => {

    const { push } = useRouter();

    const handleGoBack = () => {
        push('/products');
    }

    return (
        <Layout>
            <div className={styles.pageDetails}>
                <section className={styles.page}>
                    <div onClick={handleGoBack} className={styles.back}>
                        <FontAwesomeIcon icon={faArrowLeftLong} className={`icon__small`} />
                        <p>Regresar</p>
                    </div>
                    <ProductDetailsRender product={productProps} />
                </section>
            </div>
        </Layout>
    )
}

export default ProductDetails;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id, Marca } = ctx.query;

    try {
        const { data } = await api.get(`/api/product/${id}?Marca=${Marca}`);
        const productProps: ProductInterface[] = data

        return {
            props: productProps,
        };
    } catch (error) {
        console.error(error);
        return {
            props: []
        }
    }
};