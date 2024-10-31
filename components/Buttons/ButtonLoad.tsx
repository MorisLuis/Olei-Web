import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
    onClick: () => void,
    loading: boolean,
    buttonText: string,
    buttonTextLoading?: string
}

const ButtonLoad = ({
    onClick,
    loading,
    buttonText,
    buttonTextLoading = "Cargando..."
}: Props) => {

    return (
        <button
            className={`button ${loading ? 'loading' : ''} display-flex allCenter`}
            onClick={onClick}
            disabled={loading}
        >
            {loading ? buttonTextLoading : buttonText}
            <FontAwesomeIcon icon={faPlus} className={`icon__small m-left`} />
        </button>
    );
}

export default ButtonLoad
