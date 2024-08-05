import React, { useState, useEffect } from 'react';
import '../styles/BookGrid.css';
import axios from 'axios';
import BookItem from "./BookItem";
import useFilterStore from '../stores/useFilterStore';

function BookGrid() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const filters = useFilterStore((state) => state.filters);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/filter-books', { params: filters });
                if (response && response.data) {
                    setBooks(response.data);
                } else {
                    throw new Error('Data is undefined');
                }
            } catch (error) {
                console.error("Error fetching books:", error);
                setError(error);
            }
        };

        fetchBooks();
    }, [filters]);

    if (error) {
        return <div className="alert alert-danger">Error fetching books: {error.message}</div>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {books.filter(book => book.title && book.price).map((book, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <BookItem book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookGrid;
