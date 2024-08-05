import React from 'react';

function PublicationDateRangeFilter({ startDate, endDate, onStartDateChange, onEndDateChange }) {
    return (
        <div className="publication-date-range-filter">
            <label htmlFor="start-date">Start Date:</label>
            <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={onStartDateChange}
                className="form-control mb-2"
            />

            <label htmlFor="end-date">End Date:</label>
            <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={onEndDateChange}
                className="form-control"
            />
        </div>
    );
}

export default PublicationDateRangeFilter;
