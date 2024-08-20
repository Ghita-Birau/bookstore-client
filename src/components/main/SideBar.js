import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/SideBar.css';
import PublicationDateRangeFilter from "../filters/PublicationDateRangeFilter";
import useFilterStore from '../../stores/useFilterStore';
import FilterCount from "../filters/FiltersCount";
import FilterList from "../filters/FilterList";
import PriceSliderFilter from "../filters/PriceSliderFilter";

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
                        <PriceSliderFilter
                            min={parseFloat(filter.value.minPrice)}
                            max={parseFloat(filter.value.maxPrice)}
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
                            startDate={filter.value.startDate}
                            endDate={filter.value.endDate}
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
                        selectedOptions={filters[filter.key] || []}
                    />
                );
        }
    }

    return (
        <aside className="side-menu bg-light border-end p-3 d-flex flex-column">

            {filterOptions.filters && filterOptions.filters.map((filter, index) => (
                <div key={filter.key || index}>
                    { renderFilterComponent(filter)}
                </div>
            ))}

            <FilterCount/>
            <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                <button className="btn btn-danger" onClick={clearFilters}>Clear Filters</button>
            </div>
        </aside>
    );
}

export default SideBar;
