import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring';

interface Props {
    onclick?: () => void,
    disabled: boolean
}

const ButtonAnimated = ({
    onclick,
    disabled
}: Props) => {
    //const [loading, setLoading] = useState(false);

    const spinnerAnimation = useSpring({
        opacity: disabled ? 1 : 0,
        display: disabled ? 'block' : 'none',
    });

    const buttonText = disabled ? 'Cargando...' : 'Cargar mas';

    const handleClick = () => {
        onclick?.()
    };

    return (
        <div className="loading-button-container">
            <button
                className={`loading-button ${disabled ? 'loading' : ''}`}
                onClick={handleClick}
                disabled={disabled}
            >
                {buttonText}
                {disabled && (
                    <animated.div className="spinner" style={spinnerAnimation}>
                        <svg viewBox="0 0 50 50">
                            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                        </svg>
                    </animated.div>
                )}
            </button>
        </div>
    );
}

export default ButtonAnimated
