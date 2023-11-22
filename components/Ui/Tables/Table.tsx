import React, { useContext } from 'react';
import styles from "../../../styles/Tables.module.scss";

import { ProductCard, ProductCardMovil } from '../../Cards/ProductCard';
import { AuthContext } from '@/context';
import ProductInterface from '@/interfaces/product';
import { MessageCard } from '../../Cards/MessageCard';
import TableSkeleton from '../../Skeletons/TableSkeleton';
import ButtonAnimated from '@/components/Buttons/ButtonAnimated';
import { useProductsWithCartInfo } from '@/hooks/useProductsWithCartInfo';
import { useWindowWith } from '@/hooks/useWindowWith';

interface Props {
    data: ProductInterface[],
    loadMoreProducts: () => Promise<void>,
    buttonIsLoading: boolean,
    loadingData: boolean
}

const Table = ({ data, loadMoreProducts, buttonIsLoading, loadingData }: Props) => {

    const { productsWithCartInfo } = useProductsWithCartInfo(data)
    const { user } = useContext(AuthContext);

    const windowWidth = useWindowWith();
    const isTable = windowWidth && windowWidth <= 920;
    const isEmployee = user?.TipoUsuario === 2
    const NoMoreProductToShow = !(productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0)

    return (
        <>
            {
                loadingData ?
                    <TableSkeleton />
                    :
                    !loadingData && productsWithCartInfo.length === 0 ?
                        <MessageCard title='No hay coincidencias exactas'>
                            <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
                        </MessageCard>
                        :
                        <>
                            <div className={`${styles.table}`}>
                                <div className={styles.content}>
                                    <div className={
                                        isTable ? `${styles.headers} none` :
                                            `${styles.headers} display-flex space-between`
                                    }>
                                        <p className={styles.name}>Nombre</p>
                                        <div className={styles.otherInformation}>
                                            <div>Codigo</div>
                                            <div>Marca</div>
                                            <div>Familia</div>
                                            {isEmployee  && <div>Existencias</div>}
                                            <div>Precio (MXN)</div>
                                            <div></div>
                                        </div>
                                    </div>

                                    <div className={styles.data}>
                                        {
                                            productsWithCartInfo?.map((product: ProductInterface) => {
                                                return (
                                                    isTable ?
                                                        <ProductCardMovil product={product} key={product.Codigo && (product.Codigo + product.Id_Marca)} />
                                                        :
                                                        <ProductCard product={product} key={product.Codigo && (product.Codigo + product.Id_Marca)} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                {/* LOAD MORE PRODUCTS */}
                                {
                                    (productsWithCartInfo.length >= 20 && productsWithCartInfo.length % 20 === 0) &&
                                    <div className={styles.loadMore}>
                                        <ButtonAnimated
                                            onclick={loadMoreProducts}
                                            disabled={buttonIsLoading}
                                        />
                                    </div>
                                }
                            </div>

                            {
                                NoMoreProductToShow &&
                                <p className={styles.message}>Ya no hay mas productos, cambia los filtros para ver otros resultados</p>
                            }
                        </>
            }
        </>
    )
}

export default Table;