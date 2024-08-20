import React from 'react';
import '../../styles/Pagination.css';
import useFilterStore from "../../stores/useFilterStore";
const Pagination = () => {

    const { limit, total, page, setPage } = useFilterStore();

    const totalPages = Math.ceil(total / limit);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
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
