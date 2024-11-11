import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "@/context";
import Image from "next/image";
import styles from '../../styles/UI.module.scss';

export interface imageInterface {
    url: string,
    id: number
}

interface ProductImage {
    img: imageInterface,
    onExpand: (arg: imageInterface) => void,
    primaryProduct: imageInterface | undefined
}

function ProductImage({ img, onExpand, primaryProduct }: ProductImage) {
    return (
        <motion.div
            onClick={() => onExpand(img)}
            className={
                primaryProduct?.id === img.id
                    ? `${styles.related_product_image} ${styles.active}`
                    : styles.related_product_image
            }
            layoutId={`product-${img.url}`}
        >
            <Image
                src={img.url}
                alt={`Imagen de producto ${img.id}`}
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,..."
                width={100}
                height={100}
            />
        </motion.div>
    );
}


export const ImageGallery = ({ images }: { images: imageInterface[] | undefined }) => {

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

                    {
                        primaryProduct ?
                            <motion.div
                                key={primaryProduct.id}
                                className={styles.primary_product_image}
                                layoutId={`product-${primaryProduct.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Image
                                    src={primaryProduct.url}
                                    alt={`Imagen principal ${primaryProduct.id}`}
                                    quality={100}
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml;base64,..."
                                    priority
                                    width={100}
                                    height={100}
                                />
                            </motion.div>
                            :
                            <div className={styles.notImage}>
                                <FontAwesomeIcon icon={faImage} className={`icon`} />
                                <h2>{user?.Nombre}</h2>
                            </div>
                    }
                </AnimatePresence>
            </main>

            <aside className={styles.product_gallery}>
                <AnimatePresence>
                    {productIds?.map((img: imageInterface) => (
                        <ProductImage
                            img={img}
                            key={img.id}
                            onExpand={setAsPrimary}
                            primaryProduct={primaryProduct}
                        />
                    ))}
                </AnimatePresence>
            </aside>

        </div>
    );
}
