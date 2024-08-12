import React, { useEffect } from 'react';
import '../styles/BookGrid.css';
import BookItem from "./BookItem";
import useFilterStore from '../stores/useFilterStore';
import Paginationa from "./Paginationa";

function BookGrid() {

    const { filters, books, page, limit, total, setPage, loadBooks, sort} = useFilterStore();

    useEffect(() => {
        loadBooks();
    }, [filters, page, sort]);

    const filterBooks = Array.isArray(books) ? books.filter(book => book.title && book.price) : [];

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="container-fluid">
            <div className="row">
                {filterBooks.map((book, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <BookItem book={book}/>
                    </div>
                ))}
            </div>
            <Paginationa page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
    );
}

export default BookGrid;
