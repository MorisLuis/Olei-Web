import React from 'react'
import ToggleSwitch from '../Inputs/toggleSwitch'
import styles from "../../styles/Components/Cards.module.scss";
import ButtonSmall from '../Buttons/ButtonSmall';

interface ActionCardInterface {
    title: string;
    subtitle: string;

    color?: 'red' | "white";
    toggle?: boolean;
}

export default function ActionCard({
    title,
    subtitle,
    toggle,
    color = "white"
}: ActionCardInterface) {

    const renderAction = () => {

        return toggle ?
            (
                <ToggleSwitch
                    initialState={false}
                    onToggle={(value: boolean) => console.log(value)}
                />
            )
            :
            (
                <ButtonSmall
                    text='Vaciar'
                    onClick={() => console.log(true)}
                    color='red'
                />
            )

    }
    return (
        <div className={`${styles.ActionCard} ${styles[color]}`}>
            <div className={styles.message}>
                <p className={styles.message__title}>{title}</p>
                <p>{subtitle}</p>
            </div>

            {renderAction()}
        </div>
    )
}
