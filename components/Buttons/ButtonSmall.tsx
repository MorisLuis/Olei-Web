import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface ButtonSmallInterface {
    icon?: IconDefinition;
    text: string;
    onClick: () => void;
    extraStyles?: React.CSSProperties;
    transparent?: boolean;
    color?: "red" | "black" | "white" | "blue";
    disabled?: boolean
};

export default function ButtonSmall({
    icon,
    text,
    onClick,
    extraStyles,
    transparent = false,
    color,
    disabled
}: ButtonSmallInterface) {

    return (
        <button
            className={
                `button-small` +
                (transparent ? " " + 'transparent' : '') +
                (color ? " " + color : '') +
                (disabled ? " " + "opacity" : "")
            }
            
            onClick={onClick}
            style={extraStyles}
            disabled={disabled}
            aria-label={text}
        >
            <p>{text}</p>
            {icon && <FontAwesomeIcon icon={icon} className={`icon__small`} />}
        </button>
    )
}
