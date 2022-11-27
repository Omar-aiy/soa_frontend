import React from "react";

const Checkbox = ({ id, label, checked = false, onChange }) => {
    return (  
        <div className="custom-control custom-checkbox">
            <input className="custom-control-input" id={id} type="checkbox" onChange={onChange}/>
            <label className="custom-control-label" htmlFor={id} >
                {label}
            </label>
        </div>
    );
};

export default Checkbox;