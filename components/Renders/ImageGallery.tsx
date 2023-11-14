import { useContext, useEffect, useState } from "react";
import styles from '../../styles/UI.module.scss';

import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "@/context";

interface imageInterface {
    url: string,
    id: number
}

interface ProductImage {
    img: imageInterface,
    onExpand: any,
    primaryProduct: imageInterface | undefined
}

function ProductImage({ img, onExpand, primaryProduct }: ProductImage) {

    return (
        <motion.img
            src={img.url}
            alt={img.url}
            onClick={() => onExpand(img)}
            className={
                primaryProduct?.id === img.id ?
                    `${styles.related_product_image} ${styles.active}`
                    :
                    styles.related_product_image
            }
            layoutId={`product-${img.url}`}
        />
    );
}

export const ImageGallery = ({ images }: { images: any[] | undefined }) => {

    const [productIds, setProductIds] = useState<imageInterface[]>();
    const [primaryProduct, setPrimaryProduct] = useState<imageInterface>();
    const { user } = useContext(AuthContext);

    const setAsPrimary = (img: imageInterface) => {
        if (!productIds || !primaryProduct) return;
        setPrimaryProduct(img);
    }

    useEffect(() => {
        if (!images) return;
        const setImages = () => {
            setPrimaryProduct(images?.[0]);
            setProductIds(images);
        }

        setImages()
    }, [images])

    return (
        <div className={styles.imageGallery}>
            <main className={styles.primary_container}>
                <AnimatePresence>
                    <motion.img
                        key={primaryProduct?.id}
                        className={styles.primary_product_image}
                        src={primaryProduct?.url}
                        alt={primaryProduct?.url}
                        layoutId={`product-${primaryProduct?.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <div className={styles.notImage}>
                        <FontAwesomeIcon icon={faImage} className={`icon`} />
                        <h2>{user?.Company}</h2>
                    </div>

                </AnimatePresence>
            </main>
            <aside className={styles.product_gallery}>
                <AnimatePresence>
                    {productIds?.map((img: imageInterface) => (
                        <ProductImage img={img} key={img.id} onExpand={setAsPrimary} primaryProduct={primaryProduct} />
                    ))}
                </AnimatePresence>
            </aside>

        </div>
    );
}
