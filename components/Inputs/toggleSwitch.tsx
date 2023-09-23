import { useEffect, useState } from "react";

interface ToggleSwitchProps {
    label?: string;
    name?: string;
    onChange: any;
    value: boolean
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    label,
    name,
    onChange,
    value
}) => {
    const [checked, setChecked] = useState(value);

    useEffect(() => {
        setChecked(value)
    },  [])

    const handleToggle = () => {
        const newChecked = !checked;
        setChecked(newChecked)
        onChange(newChecked);
    };

    return (
        <label htmlFor="enStock" className="toggleSwitch">
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