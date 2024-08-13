import React from 'react';
import useFilterStore from '../../stores/useFilterStore';

function FilterOption({ keyName, option, selectedOptions =[] }) {
    const { setFilter } = useFilterStore();

    const handleFilterChange = () => {
        setFilter(keyName, option);
    };

    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                id={`${keyName}-${option}`}
                checked={selectedOptions.includes(option)}
                onChange={handleFilterChange}
            />
            <label className="form-check-label" htmlFor={`${keyName}-${option}`}>
                {option}
            </label>
        </div>
    );
}

export default FilterOption;
