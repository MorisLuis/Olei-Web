import React from 'react';
import styles from "../../styles/Components/Cards.module.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { capitalizarTexto } from '@/utils/textCapitalize';

interface Props {
    productName: string,
    onclick: (value: string) => void,
    inputValue: string,
    highlightSearchTerm: (text: string, term: string) => string
}

export const SearchItemCard = ({ productName, inputValue, onclick, highlightSearchTerm }: Props) => {

    return (
        <div
            className={styles.SearchItemCard}
            onClick={() => onclick(productName)}
        >
            <FontAwesomeIcon icon={faMagnifyingGlass} className={`icon__small`} />
            <p
                dangerouslySetInnerHTML={{
                    __html:
                        highlightSearchTerm(
                            capitalizarTexto(productName),
                            typeof inputValue === "string" ? inputValue : inputValue || ""
                        ),
                }}
            />
        </div>
    )
}
