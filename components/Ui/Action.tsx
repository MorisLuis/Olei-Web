import React, { useState } from 'react';
import styles from "../../styles/UI.module.scss";

import TagHover from './TagHover'

interface Props {
    children: any,
    textHover: string
}

const Action = ({
    children,
    textHover
}: Props) => {
    const [textHoverVisible, setTextHoverVisible] = useState(false)
    const textVisible = () => setTextHoverVisible(!textHoverVisible)
    return (
        <>
            <div className={styles.action} onMouseEnter={textVisible} onMouseLeave={textVisible}>
                {children}
                {
                    textHoverVisible && <TagHover text={textHover} />
                }
            </div>
        </>
    )
}

export default Action
