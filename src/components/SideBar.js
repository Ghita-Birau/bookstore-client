import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SideBar.css';
import FilterOption from './FilterOption';
import PriceRangeFilter from './PriceRangeFilter';
import PublicationDateRangeFilter from "./PublicationDateRangeFilter";
import useFilterStore from '../stores/useFilterStore';
import FilterCount from "./FiltersCount";

function SideBar() {
    const { filters, setFilter, filterOptions, loadFilterOptions, clearFilters } = useFilterStore();

    useEffect(() => {
        loadFilterOptions();
    },[]);

    const handleFilterChange = (key, value) => {
        setFilter(key, value);
    };

    const renderFilterOptions = (label, key, options) => (
        <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
            <h3 className="h5">{label}</h3>
            <ul className="list-unstyled flex-grow-1">
                {options.map((option, index) => (
                    <li key={index}>
                        <FilterOption
                            id={`${key}-${index}`}
                            label={option}
                            checked={filters[key].includes(option)}
                            onChange={() => handleFilterChange(key, option)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <aside className="side-menu bg-light border-end p-3 d-flex flex-column">
            {renderFilterOptions('Category', 'gen', filterOptions.genres)}
            {renderFilterOptions('Author', 'author', filterOptions.authors)}
            {renderFilterOptions('Publishing house', 'publishing_house', filterOptions.publishingHouses)}
            <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                <h3 className="h5">Price</h3>
                <PriceRangeFilter
                    id="price-range"
                    min={filterOptions.minPrice}
                    max={filterOptions.maxPrice}
                    step={1}
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMinPriceChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    onMaxPriceChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
            </div>
            <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                <h3 className="h5">Publication Date</h3>
                <PublicationDateRangeFilter
                    id="publication-date"
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    onStartDateChange={(e) => handleFilterChange('startDate', e.target.value)}
                    onEndDateChange={(e) => handleFilterChange('endDate', e.target.value)}
                />
            </div>
            <FilterCount />
            <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                <button className="btn btn-danger" onClick={clearFilters}>Clear Filters</button>
            </div>
        </aside>
    );
}

export default SideBar;
