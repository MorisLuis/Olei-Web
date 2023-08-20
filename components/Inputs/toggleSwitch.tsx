import { useEffect, useState } from "react";

interface ToggleSwitchProps {
    initialState?: boolean;
    label?: string;
    name?: string;
    onChange: any
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    initialState = false,
    label,
    name,
    onChange
}) => {
    const [checked, setChecked] = useState(initialState);

    const handleToggle = () => {
        const newChecked = !checked;
        console.log({newChecked})
        setChecked(newChecked)
        onChange(newChecked);
    };

    return (
        <label className="toggleSwitch">
            {
                label && <p className="label">{label}</p>
            }

            <div className="toggle">
                <input
                    type="checkbox"
                    name={name}
                    id={name}
                    checked={checked}
                    onChange={handleToggle}
                    className="checkbox"
                />
                <span className="slider"></span>
            </div>
        </label>
    );
};

export default ToggleSwitch