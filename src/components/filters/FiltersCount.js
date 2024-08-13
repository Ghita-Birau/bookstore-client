import React from 'react';
import useFilterStore from '../../stores/useFilterStore';

function FilterCount() {
    const { filters } = useFilterStore();

    const totalFilters = Object.values(filters).reduce((count, value) => {
        if (Array.isArray(value)) {
            return count + value.length;
        }
        if (typeof value === 'number') {
            return value !== 0 ? count + 1 : count;
        }
        if (value !== '' && value !== null) {
            return count + 1;
        }
        return count;
    }, 0);

    return (
        <div className="filter-count">
            <h5>Total Filters: {totalFilters}</h5>
        </div>
    );
}

export default FilterCount;