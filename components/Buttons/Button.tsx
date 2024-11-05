import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';

interface ButtonInterface {
    text: string;
    icon?: IconDefinition;
    onClick?: () => void;
    textDisabled?: string;
    disabled?: boolean;

    typeSubmit?: boolean;
    className?: string;
    extraStyles?: CSSProperties
}

export default function Button({
    disabled,
    onClick,
    text,
    icon,
    textDisabled,
    typeSubmit,
    className,
    extraStyles
}: ButtonInterface) {
    return (
        <button
            disabled={disabled}
            className={`button ${className}`}
            type={typeSubmit ? "submit" : 'button'}
            onClick={() => onClick?.()}
            aria-label={text}
            style={extraStyles}
        >
            {disabled && textDisabled ? textDisabled : text}
            {icon && <FontAwesomeIcon icon={icon} className={`icon__small`} />}
        </button>
    )
}
