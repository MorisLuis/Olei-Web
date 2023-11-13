import React from 'react';
import styles from './../../styles/Pages/ProductDetails.module.scss';

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/Layouts/Layout';
import ProductInterface from '@/interfaces/product';
import { api } from '@/api/api';
import { ProductDetailsRender } from '@/components/Renders/ProductDetailsRender';

const ProductDetails = (productProps: ProductInterface) => {

    const { back } = useRouter();

    const handleGoBack = () => {
        back();
    }

    return (
        <Layout>
            <div onClick={handleGoBack}>
                Regresar
            </div>

            <ProductDetailsRender product={productProps} />

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