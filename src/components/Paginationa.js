import React from 'react';
import '../styles/Pagination.css';
const Paginationa = ({ page, totalPages, handlePageChange }) => {

    return (
        <div className="pagination">
            {page > 1 && <button onClick={() => handlePageChange(page - 1)}>Previous</button>}
            <span>Page {page} of {totalPages}</span>
            {page < totalPages && <button onClick={() => handlePageChange(page + 1)}>Next</button>}
        </div>
    );
};

export default Paginationa;
