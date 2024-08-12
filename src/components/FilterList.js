import React from 'react';
import FilterOption from './FilterOption';

function FilterList({ keyName, label, options, selectedOptions }) {
    return (
        <div className="filter-list mb-4 flex-grow-1 d-flex flex-column">
            <h3 className="h5">{label}</h3>
            <ul className="list-unstyled flex-grow-1">
                {options.map((option, index) => (
                    <li key={index}>
                        <FilterOption
                            keyName={keyName}
                            option={option}
                            selectedOptions={selectedOptions}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FilterList;
