import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faGripLines, faGrip} from '@fortawesome/free-solid-svg-icons';

interface ToggleSwitchProps {
    label?: string;
    name?: string;
    onChange: any;
    value: boolean
}

const ToggleSquareSwitch: React.FC<ToggleSwitchProps> = ({
    label,
    name,
    onChange,
    value
}) => {
    const [checked, setChecked] = useState(value);

    useEffect(() => {
        setChecked(value)
    }, [])

    const handleToggle = () => {
        const newChecked = !checked;
        setChecked(newChecked)
        console.log({ newChecked })
        onChange(newChecked);
    };

    return (
        <>
            <label htmlFor="view" className="toggleSquareSwitch">
                {
                    label && <p style={{ marginRight: "1em" }}>{label}</p>
                }

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
        </>
    );
};

export default ToggleSquareSwitch