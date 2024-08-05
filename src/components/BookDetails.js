import React from 'react';
import { useLocation } from 'react-router-dom';

function BookDetails() {
    const location = useLocation();
    const { book } = location.state;

    return (
        <div className="container">
            <h1>{book.title}</h1>
            <img src={book.image_url} alt={book.title} className="img-fluid" />
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publishing House:</strong> {book.publishing_house}</p>
            <p><strong>Genre:</strong> {book.gen}</p>
            <p><strong>Price:</strong> {book.price}</p>
            <p><strong>Published:</strong> {book.publication_date}</p>
            <p>{book.description}</p>
        </div>
    );
}

export default BookDetails;
