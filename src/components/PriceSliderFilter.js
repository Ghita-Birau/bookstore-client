import React, { useState, useEffect } from 'react';
import { Slider } from '@mui/material';
import useFilterStore from "../stores/useFilterStore";

function PriceSliderFilter({ min, max, step }) {
    const { filters, setFilter } = useFilterStore();
    const [value, setValue] = useState([filters.minPrice || min, filters.maxPrice || max]);


    useEffect(() => {
        setValue([filters.minPrice || min, filters.maxPrice || max]);
    }, [filters.minPrice, filters.maxPrice, min, max]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeCommitted = (event, newValue) => {
        setFilter('minPrice', newValue[0]);
        setFilter('maxPrice', newValue[1]);
    };

    return (
        <div className="price-range-filter mb-4">
            <label className="form-label">Price Range</label>
            <Slider
                value={value}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommitted}
                valueLabelDisplay="auto"
                min={min}
                max={max}
                step={step}
            />
            <div className="d-flex justify-content-between">
                <span>{value[0]}</span>
                <span>{value[1]}</span>
            </div>
        </div>
    );
}

export default PriceSliderFilter;
