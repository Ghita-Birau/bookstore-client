import React, { useEffect } from 'react';
import '../styles/BookGrid.css';
import { fetchBooks} from "../apiRoutes";
import BookItem from "./BookItem";
import useFilterStore from '../stores/useFilterStore';

function BookGrid() {
    const { filters, books, setBooks, setError } = useFilterStore();

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const booksData = await fetchBooks(filters);
                setBooks(booksData);
            } catch (error) {
                setError(error);
            }
        };
        loadBooks();
    },[filters]);

    const filterBooks = Array.isArray(books) ? books.filter(book => book.title && book.price) : [];

    return (
        <div className="container-fluid">
            <div className="row">
                {filterBooks.map((book, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <BookItem book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookGrid;
