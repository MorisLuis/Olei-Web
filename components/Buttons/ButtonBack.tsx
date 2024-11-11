import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface ButtonBackInterface {
    icon?: IconDefinition;
    text: string;
    onClick: () => void;
    extraStyles?: React.CSSProperties;
    transparent?: boolean;
    color?: "red" | "black" | "white";
    disabled?: boolean
};

export default function ButtonBack({
    icon,
    text,
    onClick,
    extraStyles,
    transparent = false,
    color,
    disabled
}: ButtonBackInterface) {

    return (
        <button
            className={
                `button-small` + " " + "back" +
                (transparent ? " " + 'transparent' : '') +
                (color ? " " + color : '') +
                (disabled ? " " + "opacity" : "")
            }
            
            onClick={onClick}
            style={extraStyles}
            disabled={disabled}
            aria-label={text}
        >
            {icon && <FontAwesomeIcon icon={icon} className={`icon__small`} />}
            <p>{text}</p>
        </button>
    )
}
