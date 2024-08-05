import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SideBar.css';
import FilterOption from './FilterOption';
import PriceRangeFilter from './PriceRangeFilter';
import PublicationDateRangeFilter from "./PublicationDateRangeFilter";
import useFilterStore from '../stores/useFilterStore';
import axios from 'axios';

function SideBar() {
    const { filters, setFilter } = useFilterStore();
    const [filterOptions, setFilterOptions] = useState({
        genres: [],
        authors: [],
        publishingHouses: [],
        minPrice: '',
        maxPrice: '',
    });

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/filters');
                if (response.data) {
                    setFilterOptions(response.data);
                }
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };

        fetchFilters();
    }, []);

    const handleFilterChange = (key, value) => {
        setFilter(key, value);
    };

    return (
        <aside className="side-menu bg-light border-end p-3 d-flex flex-column">
            <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                <h3 className="h5">Category</h3>
                <ul className="list-unstyled flex-grow-1">
                    {filterOptions.genres.map((genre, index) => (
                        <li key={index}>
                            <FilterOption
                                id={`genre-${index}`}
                                label={genre}
                                onChange={() => handleFilterChange('gen', genre)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                <h3 className="h5">Author</h3>
                <ul className="list-unstyled flex-grow-1">
                    {filterOptions.authors.map((author, index) => (
                        <li key={index}>
                            <FilterOption
                                id={`author-${index}`}
                                label={author}
                                onChange={() => handleFilterChange('author', author)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                <h3 className="h5">Publishing House</h3>
                <ul className="list-unstyled flex-grow-1">
                    {filterOptions.publishingHouses.map((publishingHouse, index) => (
                        <li key={index}>
                            <FilterOption
                                id={`publishingHouse-${index}`}
                                label={publishingHouse}
                                onChange={() => handleFilterChange('publishing_house', publishingHouse)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="menu-section mb-4 flex-grow-1 d-flex flex-column">
                <h3 className="h5">Price</h3>
                <PriceRangeFilter
                    id="price-range"
                    min={filterOptions.minPrice}
                    max={filterOptions.maxPrice}
                    step={1}
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
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
        </aside>
    );
}

export default SideBar;
