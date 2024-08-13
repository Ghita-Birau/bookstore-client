import React from 'react';
import '../../styles/BookItem.css';
import defaultImage from "../../assets/default-book-cover.jpg";
import { Link } from 'react-router-dom';

function BookItem({ book }) {
    const { id, title, author, publishing_house, gen, price, publication_date, image_url, description } = book;

    if (!title || !price) {
        return null;
    }

    let formattedPublicationDate = 'Unknown';
    if (publication_date) {
        try {
            const date = new Date(publication_date);
            if (!isNaN(date.getTime())) {
                formattedPublicationDate = date.toISOString().split('T')[0];
            }
        } catch (error) {
            console.error("Invalid date format", error);
        }
    }

    const validatedBook = {
        id,
        title,
        author: author || 'Unknown',
        publishing_house: publishing_house || 'Unknown',
        gen: gen || 'Undefined',
        price,
        publication_date: formattedPublicationDate,
        image_url: image_url || defaultImage,
        description: description || 'No description available'
    };

    const isUnknownOrUndefined = (value) => {
        return value === 'Unknown' || value === 'Undefined' || value === 'No description available';
    };

    return (
        <div className="card mb-3 h-100">
            <div className="row g-0 h-100">
                <div className="col-md-4">
                    <Link to={`/book/${validatedBook.id}`} state={{ book: validatedBook }}>
                        <img src={validatedBook.image_url} alt="Book Cover" className="img-fluid rounded-start h-100"/>
                    </Link>
                </div>

                <div className="col-md-8">
                    <div className="card-body d-flex flex-column justify-content-center">
                        <h5 className="card-title">{validatedBook.title}</h5>
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.author) ? 'text-muted' : ''}`}>Author: {validatedBook.author}</p>
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.publishing_house) ? 'text-muted' : ''}`}>Publishing House: {validatedBook.publishing_house}</p>
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.gen) ? 'text-muted' : ''}`}>Genre: {validatedBook.gen}</p>
                        <p className="card-text text-success">Price: {validatedBook.price}</p>
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.publication_date) ? 'text-muted' : ''}`}>Published: {validatedBook.publication_date}</p>
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.description) ? 'text-muted' : ''}`}>{validatedBook.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookItem;
