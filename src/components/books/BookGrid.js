import React, { useEffect } from 'react';
import '../../styles/BookGrid.css';
import BookItem from "./BookItem";
import useFilterStore from '../../stores/useFilterStore';
import Pagination from "../main/Pagination";

function BookGrid() {

    const { filters, books, page, setPage, loadBooks, sort} = useFilterStore();

    useEffect(() => {
        loadBooks();
    }, [filters, page, sort]);

    const filterBooks = Array.isArray(books) ? books.filter(book => book.title && book.price) : [];

    return (
        <div className="container-fluid">
            <div className="row">
                {filterBooks.map((book, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <BookItem book={book}/>
                    </div>
                ))}
            </div>
            <Pagination
                page={page}
                onPageChange={setPage}
            />
        </div>
    );
}

export default BookGrid;
