import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SideBar.css';
import PublicationDateRangeFilter from "./PublicationDateRangeFilter";
import useFilterStore from '../stores/useFilterStore';
import FilterCount from "./FiltersCount";
import FilterList from "./FilterList";
import PriceSliderFilter from "./PriceRangeFilter";
import PriceRangeFilter from "./PriceRangeFilter";

function SideBar() {
    const { filters, filterOptions, loadFilterOptions, clearFilters} = useFilterStore();

    useEffect(() => {
        loadFilterOptions();
    },[]);


    //console.log("Filter options:", filterOptions.filters);

    const renderFilterComponent = (filter) => {
        switch (filter.key) {
            case 'price':
                return (
                    <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                        <h3 className="h5">{filter.label}</h3>
                        {/*<PriceRangeFilter*/}
                        {/*    id="price-range"*/}
                        {/*    min={parseFloat(filterOptions.minPrice)}*/}
                        {/*    max={parseFloat(filterOptions.maxPrice)}*/}
                        {/*    step={1}*/}
                        {/*    minPrice={filter.minPrice}*/}
                        {/*    maxPrice={filter.maxPrice}*/}
                        {/*/>*/}
                        <PriceSliderFilter
                            min={filterOptions.minPrice}
                            max={filterOptions.maxPrice}
                            step={1}
                        />
                    </div>
                );
            case 'date':
                return (
                    <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                        <h3 className="h5">{filter.label}</h3>
                        <PublicationDateRangeFilter
                            id="publication-date"
                            startDate={filterOptions.startDate}
                            endDate={filterOptions.endDate}
                        />
                    </div>
                );
            default:
                return (
                    <FilterList
                        key={filter.key}
                        keyName={filter.key}
                        label={filter.label}
                        options={filter.value}
                        selectedOptions={filter[filter.key]}
                    />
                );
        }
    }

    return (
        <aside className="side-menu bg-light border-end p-3 d-flex flex-column">
            {/*{filterOptions.filters && filterOptions.filters.map(filter => (*/}
            {/*    renderFilterComponent(filter)*/}
            {/*))}*/}

            {filterOptions.filters && filterOptions.filters.map((filter, index) => (
                <React.Fragment key={filter.key || index}>
                    {renderFilterComponent(filter)}
                </React.Fragment>
            ))}

            <FilterCount/>
            <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                <button className="btn btn-danger" onClick={clearFilters}>Clear Filters</button>
            </div>
        </aside>
    );
}

export default SideBar;
