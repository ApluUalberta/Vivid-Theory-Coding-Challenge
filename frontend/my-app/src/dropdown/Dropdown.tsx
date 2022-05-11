import {useState} from "react";
// Should just accept a list of strings (for our use cases, the Device IDs and serial numbers)
import "./styles.css";
const Dropdown = (props: any) => {
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState("Choose One (Click me)");
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) =>
            setIsActive(!isActive)}>
                {selected}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
            <div className="dropdown-content">
                {props.options.map((option: String) => (
                    <div onClick={(e) => {

                            setSelected(String(option))
                            setIsActive(false)
                            }
                        } className="dropdown-item">
                        {option}
                    </div>
                ))}
            </div>
            )}

        </div>
    )
}

export default Dropdown;