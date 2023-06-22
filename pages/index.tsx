import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { api } from '@/api/api'
import { GetServerSideProps } from 'next'
import { Layout } from '@/components/Layouts/Layout'

export default function Home({ products }: any) {

  return (
    <>
      <Layout>
        <main className={styles.main}>

          <h1 style={{ marginBottom: "50px" }}>OleiWeb</h1>
          <div>
            {
              products?.map((product: any, index: number) => {
                return (
                  <>
                    <div key={index} style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                      <p>Descripción : {product.Descripcion} </p>
                      <span style={{ margin: "0px 20px" }}>/</span>
                      <p>Codigo : {product.Codigo} </p>
                      <span style={{ margin: "0px 20px" }}>/</span>
                      <p>Precio: {product.Precio ? product.Precio + "$" : "No tiene precio"}</p>
                      <span style={{ margin: "0px 20px" }}>/</span>
                      <p>Categoria: {product.Nombre}</p>
                      <span style={{ margin: "0px 20px" }}>/</span>
                      <p>Exisencias: {product.Existencia}</p>
                    </div>
                  </>
                )
              })
            }
          </div>
        </main>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await api.get('/api/product');

    console.log({ data : data.products })
    return {
      props: {
        products : data.products
      }
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        products: []
      }
    };
  }
}