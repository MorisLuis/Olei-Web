import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';

interface ButtonInterface {
    text: string;
    icon?: IconDefinition;
    onClick?: () => void;
    textDisabled?: string;
    disabled: boolean;

    typeSubmit?: boolean;
    className?: string;
    iconClassName?: string;
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
    iconClassName,
    extraStyles
}: ButtonInterface) {
    return (
        <button
            disabled={disabled}
            className={disabled ? `button ${className} disabled` : `button ${className}`}
            type={typeSubmit ? "submit" : 'button'}
            onClick={() => onClick?.()}
            aria-label={text}
            style={extraStyles}
        >
            <p className='text'>{disabled && textDisabled ? textDisabled : text}</p>
            {icon && <FontAwesomeIcon icon={icon} className={`icon__small ${iconClassName}`} />}
        </button>
    )
}
