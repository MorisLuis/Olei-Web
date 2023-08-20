import { useEffect, useState } from 'react';
import styles from "../styles/Pages/Home.module.scss";

import { api } from '@/api/api';
import { GetServerSideProps } from 'next';
import { Layout } from '@/components/Layouts/Layout';
import Table from '@/components/Ui/Table';
import PorductInterface from '@/interfaces/product';
import { Tag } from '@/components/Ui/Tag';
import ProductInterface from '@/interfaces/product';
import Cookies from 'js-cookie';
import ModalRequest from '@/components/Modals/ModalRequest';
import FiltersModalContent from '@/components/Modals/ModalsComponents/FiltersModalContent';
import FiltersInterface from '@/interfaces/filters';

interface Props {
  products: ProductInterface[]
}

const filterState: FiltersInterface = {
  nombre: null,
  marca: null,
  familia: null,
  folio: null,
  noStock: false,
}

export default function Home({ products }: Props) {

  const [filterActive, setFilterActive] = useState<FiltersInterface>(filterState);
  const [openModalFilter, setOpenModalFilter] = useState(false)

  useEffect(() => {
    const savedFiltersString = Cookies.get('activeFilters');
    if (savedFiltersString !== "undefined") {
      if (!savedFiltersString) return;
      const parsedFilters = JSON.parse(savedFiltersString);
      const areFiltersEqual =
        parsedFilters.nombre === filterState.nombre &&
        parsedFilters.marca === filterState.marca &&
        parsedFilters.familia === filterState.familia &&
        parsedFilters.folio === filterState.folio &&
        parsedFilters.noStock === filterState.noStock;

      if (areFiltersEqual) return;

      const savedFilters: FiltersInterface = JSON.parse(savedFiltersString);
      setFilterActive(savedFilters);
    }
  }, []);

  useEffect(() => {
    Cookies.set('activeFilters', JSON.stringify(filterActive));
  }, [filterActive]);

  const handleFiltersToQuery = (temporalFilters: FiltersInterface) => {
    setFilterActive(temporalFilters)
  }

  const handleCloseTag = (filter: any) => {
    if (filter === "noStock") {
      setFilterActive((prevState: FiltersInterface) => ({
        ...prevState,
        [filter[0]]: false
      }))
    } else {
      setFilterActive((prevState: FiltersInterface) => ({
        ...prevState,
        [filter[0]]: null
      }))
    }
  }

  const filterMapped = Object.entries(filterActive)
    .filter((filter) => filter[1] !== null && filter[1] !== false)
    .map((filter) => filter[1] === true ? [filter[0], "En Stock"] : filter)

  return (
    <>
      <Layout filterActive={filterActive} setFilterActive={setFilterActive}>
        <div className={styles.home}>
          {
            filterActive?.nombre && <h2>{filterActive?.nombre}</h2>
          }
          <div className={`${styles.filters} display-flex`}>
            <button className={`button-small white display-flex align`} onClick={() => setOpenModalFilter(true)}>
              <p>Filtros</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </button>
            <>
              {
                filterMapped.map((filter: any, Index) => (
                  <Tag
                    key={Index}
                    onClose={() => handleCloseTag(filter)}
                    close
                    cursor
                  >
                    {filter[1]}
                  </Tag>
                ))
              }
            </>
            <>
              {
                filterMapped.length > 0 ? <Tag close color='gray' onClose={() => setFilterActive(filterState)}>Limpiar filtros</Tag> : <></>
              }
            </>
          </div>

          <main className={styles.main}>
            <Table data={products} />
          </main>
        </div>
      </Layout>

      <ModalRequest
        visible={openModalFilter}
        title="Filtros"
        small
        modalBlack
        onClose={() => setOpenModalFilter(false)}
      >
        <FiltersModalContent
          handleFiltersToQuery={(values: any) => handleFiltersToQuery(values)}
          filterState={filterActive}
        />
      </ModalRequest>
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