import React from 'react';

function PriceRangeFilter({ id, label, min, max, step, value, onChange }) {
    return (
        <div className="price-range-filter mb-4">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type="range"
                className="form-range"
                id={id}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
            />
            <div className="d-flex justify-content-between">
                <span>{min}</span>
                <span>{value}</span>
                <span>{max}</span>
            </div>
        </div>
    );
}

export default PriceRangeFilter;
