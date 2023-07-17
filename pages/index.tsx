import { api } from '@/api/api';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/Layouts/Layout';
import Table from '@/components/Ui/Table';
import PorductInterface from '@/interfaces/product';
import { useState } from 'react';
import Filter from '@/components/Ui/Filter';
import { Tag } from '@/components/Ui/Tag';
import styles from "../styles/Pages/Home.module.scss";

interface Props {
  products: PorductInterface[]
}

export default function Home({ products }: Props) {

  const [openFilterModal, setOpenFilterModal] = useState(false)
  const [filterActive, setFilterActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedFilters = localStorage.getItem('activeFilters');
      return storedFilters ? JSON.parse(storedFilters) : [];
    } else {
      return [];
    }
  });

  const handleTagClose = (index: number) => {
    const updatedFilters = filterActive.filter((_: any, i: any) => i !== index);
    setFilterActive(updatedFilters);
    localStorage.setItem('activeFilters', JSON.stringify(updatedFilters));
  };


  console.log({filterActive})
  return (
    <>
      <Layout filterActive={filterActive} setFilterActive={setFilterActive}>
        <div className={styles.home}>

          <div className={`${styles.filters} display-flex`}>
            <button className={`button-small white display-flex align`} onClick={() => setOpenFilterModal(true)}>
              Filtros
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="icon w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </button>
            <Filter
              visible={openFilterModal}
              filterActive={filterActive}
              setFilterActive={setFilterActive}
            />
            {
              filterActive.map((filter: any, Index: number) =>
                <Tag
                  key={Index}
                  onClose={() => handleTagClose(Index)}
                  close
                  cursor
                >{filter}</Tag>
              )
            }
            {
              filterActive.length > 0 && <Tag close color='gray' onClose={() => setFilterActive([])}>Limpiar filtros</Tag>
            }
          </div>

          <main className={styles.main}>
            <Table data={products} />
          </main>
        </div>
      </Layout>

      {/* Background to close the modal filter */}
      {
        openFilterModal && <div onClick={() => setOpenFilterModal(false)} className='backdropTransparent'></div>
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await api.get('/api/product');
    const products: PorductInterface[] = data.products

    return {
      props: {
        products
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