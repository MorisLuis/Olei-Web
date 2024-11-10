import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
    onClick: () => void,
    loading: boolean,
    buttonText: string,
    buttonTextLoading?: string;
    color?: "red" | "black" | "white" | "blue";

}

const ButtonLoad = ({
    onClick,
    loading,
    buttonText,
    buttonTextLoading = "Cargando...",
    color
}: Props) => {

    return (
        <button
            className={`button ${color} ${loading ? 'loading' : ''} display-flex allCenter`}
            onClick={onClick}
            disabled={loading}
        >
            {loading ? buttonTextLoading : buttonText}
            {!loading && <FontAwesomeIcon icon={faPlus} className={`icon__small`} />}
        </button>
    );
}

export default ButtonLoad
