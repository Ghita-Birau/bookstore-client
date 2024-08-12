import React from 'react';
import '../styles/Pagination.css';
import useFilterStore from "../stores/useFilterStore";
const Pagination = ({ page, onPageChange }) => {

    const { limit, total, } = useFilterStore();

    const totalPages = Math.ceil(total / limit);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="pagination">
            {page > 1 && <button onClick={() => handlePageChange(page - 1)}>Previous</button>}
            <span>Page {page} of {totalPages}</span>
            {page < totalPages && <button onClick={() => handlePageChange(page + 1)}>Next</button>}
        </div>
    );
};

export default Pagination;
