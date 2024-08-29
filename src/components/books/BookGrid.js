import React, { useEffect } from 'react';
import '../../styles/BookGrid.css';
import BookItem from "./BookItem";
import useFilterStore from '../../stores/useFilterStore';
import Pagination from "../main/Pagination";
import useUserStore from "../../stores/useUserStore";
function BookGrid() {

    const { filters, books, page, loadBooks, sort} = useFilterStore();
    const { user } =useUserStore();

    useEffect(() => {
        loadBooks();
    }, [filters, page, sort, user]);

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
            <Pagination />
        </div>
    );
}

export default BookGrid;
