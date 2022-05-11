import {useState} from "react";
// Should just accept a list of strings (for our use cases, the Device IDs and serial numbers)
function Dropdown(options: any[]) {
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState("");
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) =>
            setIsActive(!isActive)}>
                Choose One
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
            <div className="dropdown-content">
                {options.map((option) => (
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