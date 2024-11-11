import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faGripLines, faGrip } from '@fortawesome/free-solid-svg-icons';

interface ToggleSwitchProps {
    name: string;
    onChange: (arg: boolean) => void;
    value: boolean
}

const ToggleSquareSwitch: React.FC<ToggleSwitchProps> = ({
    name,
    onChange,
    value
}) => {
    const [checked, setChecked] = useState(value);

    const handleToggle = () => {
        const newChecked = !checked;
        setChecked(newChecked)
        onChange(newChecked);
    };

    useEffect(() => {
        setChecked(value)
    }, [value])

    return (
        <label htmlFor={name || "view"} className="toggleSquareSwitch">
            <div className="toggleSquare">
                <input
                    type="checkbox"
                    name={name}
                    id={name}
                    checked={checked || value}
                    onChange={handleToggle}
                    className="checkbox"
                />
                <div className="sliderSquare">
                    <FontAwesomeIcon icon={faGripLines} className={"iconSquare"} />
                    <FontAwesomeIcon icon={faGrip} className={"iconSquareSecond"} />
                </div>
            </div>
        </label>
    );
};

export default ToggleSquareSwitch