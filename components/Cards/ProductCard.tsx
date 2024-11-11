import React from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Counter from '../Ui/Counter';
import ProductInterface from '@/interfaces/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../../styles/Components/Cards.module.scss";

type RenderableValue = string | number | { url: string; id: number; } | [{ url: string; id: number; }] | any;

export interface DataCardConfig<T> {
    key: keyof T;
    label: string;
    render?: (value: RenderableValue) => React.ReactNode;
    className?: string;
    width?: string;
}

interface Props {
    product: ProductInterface;
    onRemove?: (product: ProductInterface) => void;
    onAdd?: (item: ProductInterface, newValue: number) => void;
    data: DataCardConfig<ProductInterface>[];
}

const ProductCard = ({
    product,
    onRemove,
    onAdd,
    data
}: Props) => {

    return (
        <div className={styles.ProductCard}>
            <div className={styles.productHeader}>
                <div className={styles.delete} onClick={() => onRemove?.(product)}>
                    <FontAwesomeIcon icon={faTrashCan} className={'icon__small'} />
                </div>
            </div>

            <div className={styles.productInfo}>
                <div className={styles.data}>
                    {data.map((col, index) => (
                        <div className={styles.item}
                            key={index}
                            style={{ width: col.width }}
                        >
                            <p className={col.className}>
                                <span>{col.label ? `${col.label}: ` : ``}</span>
                                {Array.isArray(product[col.key])
                                    ? (product[col.key] as RenderableValue[]).map((item, idx) => (
                                        <div key={idx}>
                                            {col.render
                                                ? col.render(item)
                                                : <span>{JSON.stringify(item)}</span>}
                                        </div>
                                    ))
                                    : col.render
                                        ? col.render(product[col.key] as RenderableValue)
                                        : <span>{String(product[col.key])}</span>
                                }
                            </p>
                        </div>
                    ))}
                </div>

                <div className={styles.counter}>
                    <Counter
                        counter={product?.Cantidad || 0}
                        setCounter={(value: number) => onAdd?.(product, value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
