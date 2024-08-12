import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBook } from '../apiRoutes';
import { useNavigate} from "react-router-dom";

const bookCache = new Map();
function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBook = async () => {
            if(bookCache.has(id)) {
                setBook(bookCache.get(id));
                return;
            }
            try {
                const data = await fetchBook(id);
                bookCache.set(id, data);
                setBook(data);
            } catch (error) {
                setError(error.message);
            }
        };
        loadBook();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!book) {
        return <div>Book not found!</div>;
    }

    return (
        <div className="container">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
            <h1>{book.title}</h1>
            <img src={book.image_url} alt={book.title} className="img-fluid"/>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publishing House:</strong> {book.publishing_house}</p>
            <p><strong>Genre:</strong> {book.gen}</p>
            <p><strong>Price:</strong> {book.price}</p>
            <p><strong>Published:</strong> {new Date(book.publication_date).toLocaleDateString()}</p>
            <p>{book.description}</p>
        </div>
    );
}

export default BookDetails;
