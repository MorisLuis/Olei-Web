import React from 'react'
import styles from "../../styles/Components/Cards.module.scss";

interface EmptyMessageCardInterface {
    title: string;
    subtitle: string
}

export const EmptyMessageCard = ({
    title,
    subtitle
} : EmptyMessageCardInterface) => {
    return (
        <div className={`${styles.messageEmpty} display-flex column allCenter`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='icon  m-right'>
                <path d="M18.546 3h-13.069l-5.477 8.986v9.014h24v-9.014l-5.454-8.986zm-11.946 2h10.82l3.642 6h-4.476l-3 3h-3.172l-3-3h-4.471l3.657-6zm15.4 14h-20v-6h4.586l3 3h4.828l3-3h4.586v6z" />
            </svg>
            <div className={`display-flex column allCenter`}>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}
