import React from 'react';

function PriceRangeFilter({ min, max, step, minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }) {
    return (
        <div className="price-range-filter mb-4">
            <label className="form-label">Price Range</label>
            <div className="d-flex justify-content-between">
                <span>{min}</span>
                <span>{max}</span>
            </div>
            <div className="d-flex justify-content-between">
                <input
                    type="range"
                    className="form-range"
                    min={min}
                    max={max}
                    step={step}
                    value={minPrice}
                    onChange={onMinPriceChange}
                />
                <input
                    type="range"
                    className="form-range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxPrice}
                    onChange={onMaxPriceChange}
                />
            </div>
            <div className="d-flex justify-content-between">
                <span>{minPrice}</span>
                <span>{maxPrice}</span>
            </div>
        </div>
    );
}

export default PriceRangeFilter;
