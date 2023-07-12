import { api } from '@/api/api';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/Layouts/Layout';
import Table from '@/components/Ui/Table';
import styles from "../styles/Pages/Home.module.scss";

export default function Home({ products }: any) {

  return (
    <Layout>
      <div className={styles.home}>
        <h1 style={{ marginBottom : "1em"}}>OleiWeb</h1>
        <main className={styles.main}>
          <Table  data={products}/>
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await api.get('/api/product');

    return {
      props: {
        products: data.products
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