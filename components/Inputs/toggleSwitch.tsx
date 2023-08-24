import { useEffect, useState } from "react";

interface ToggleSwitchProps {
    initialState?: boolean;
    label?: string;
    name?: string;
    onChange: any;
    value?: boolean
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    initialState = false,
    label,
    name,
    onChange,
    value
}) => {
    const [checked, setChecked] = useState(initialState);

    const handleToggle = () => {
        const newChecked = !checked;
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
                    checked={checked || value}
                    onChange={handleToggle}
                    className="checkbox"
                />
                <span className="slider"></span>
            </div>
        </label>
    );
};

export default ToggleSwitch