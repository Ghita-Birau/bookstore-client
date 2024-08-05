import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FilterOption({ id, label, onChange }) {
    return (
        <div className="form-check">
            <input className="form-check-input me-2" type="checkbox" id={id} onChange={onChange}/>
            <label className="form-check-label" htmlFor={id}>
                {label}
            </label>
        </div>
    );
}

export default FilterOption;
