import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
    onclick?: () => void,
    disabled: boolean
}

const ButtonAnimated = ({
    onclick,
    disabled
}: Props) => {


    const buttonText = disabled ? 'Cargando...' : 'Ver más';

    const handleClick = () => {
        onclick?.()
    };

    return (
        <div className="loading-button-container display-flex align">
            <button
                className={`loading-button ${disabled ? 'loading' : ''} `}
                onClick={handleClick}
                disabled={disabled}
            >
                {buttonText}
                <FontAwesomeIcon icon={faPlus} className={`icon__small m-left`} />
            </button>
        </div>
    );
}

export default ButtonAnimated
