import React, { useState, useEffect } from 'react';

interface ToggleProps {
    initialState: boolean;
    onToggle: (newState: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ initialState, onToggle }) => {
    const [isChecked, setIsChecked] = useState(initialState);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = e.target.checked;
        setIsChecked(newState);
        onToggle(newState);
    };

    useEffect(() => {
        setIsChecked(initialState);
    }, [initialState]);

    return (
        <label className="toggleSwitch">
            <div className="toggle">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                    className='checkbox'
                    style={{ display: 'none' }}
                />
                <span className="slider"></span>
            </div>
        </label>
    );
};

export default ToggleSwitch;
