import React from 'react';
import useFilterStore from '../stores/useFilterStore';

function FilterCount() {
    const { filters } = useFilterStore();

    const totalFilters = Object.values(filters).reduce((count, value) => {
        if (Array.isArray(value)) {
            return count + value.length;
        }
        return value !== '' ? count + 1 : count;
    }, 0);

    return (
        <div className="filter-count">
            <h5>Total Filters: {totalFilters}</h5>
        </div>
    );
}

export default FilterCount;
