import React from 'react';
import useFilterStore from "../stores/useFilterStore";

function PublicationDateRangeFilter({ startDate, endDate }) {

    const { setFilter } = useFilterStore();

    const handleDateChange = (key, value) => {
        setFilter(key, value);
    };


    return (
        <div className="publication-date-range-filter">
            <label htmlFor="start-date">Start Date:</label>
            <input
                type="date"
                id="start-date"
                value={startDate || ''}
                onChange={(event) => handleDateChange('startDDate', event.target.value)}
                className="form-control mb-2"
            />

            <label htmlFor="end-date">End Date:</label>
            <input
                type="date"
                id="end-date"
                value={endDate || ''}
                onChange={(event) => handleDateChange('endDate', event.target.value)}
                className="form-control"
            />
        </div>
    );
}

export default PublicationDateRangeFilter;
