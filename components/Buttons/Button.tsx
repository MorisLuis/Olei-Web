import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ButtonInterface {
    text: string;
    icon?: IconDefinition;
    onClick?: () => void;
    textDisabled?: string;
    disabled?: boolean;

    typeSubmit?: boolean;
    className?: string;
}

export default function Button({
    disabled,
    onClick,
    text,
    icon,
    textDisabled,
    typeSubmit,
    className
}: ButtonInterface) {
    return (
        <button
            disabled={disabled}
            className={`button display-flex allCenter ${className}`}
            type={typeSubmit ? "submit" : 'button'}
            onClick={() => onClick?.()}
            aria-label={text}
        >
            {disabled && textDisabled ? textDisabled : text}
            {icon && <FontAwesomeIcon icon={icon} className={`icon__small`} />}
        </button>
    )
}
