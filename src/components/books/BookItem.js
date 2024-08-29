import React, {useState} from 'react';
import '../../styles/BookItem.css';
import defaultImage from "../../assets/default-book-cover.jpg";
import { Link } from 'react-router-dom';
import useOrderStore from "../../stores/useOrderStore";
import useUserStore from "../../stores/useUserStore";
import {jwtDecode} from "jwt-decode";
import UpdateStockModal from "./UpdateStockModal";
import {deleteBook, updateBookStock} from "../../apiRoutes/booksRoutes";
import { useNavigate} from "react-router-dom";


function BookItem({ book }) {
    const { id, title, author, publishing_house, gen, price, publication_date, stock, discount, is_favorite, image_url, short_description, long_description } = book;
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const addToCart = useOrderStore((state) => state.addToCart);
    const { isAuthenticated } = useUserStore();
    const navigate = useNavigate();


    const token = localStorage.getItem('token');
    let role = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        role = decodedToken.role;
    }

    const handleAddToCart = () => {
        if (quantity > stock) {
            alert(`Only ${stock} copies available in stock. Please adjust the quantity.`);
            return;
        }

        addToCart(book, quantity);
        alert('Book added to cart!');
    };

    if (!title || !price) {
        return null;
    }

    const handleUpdate = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleDelete = async () => {
        try {
            await deleteBook(id);
            alert('Book deleted successfully');
            navigate('/');
        } catch (error) {
            alert('Failed to delete book. Please try again.');
        }
    };

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
        short_description: short_description || 'No description available',
        stock: stock || 0
    };

    const isUnknownOrUndefined = (value) => {
        return value === 'Unknown' || value === 'Undefined' || value === 'No description available';
    };

    return (
        <>
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
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.publishing_house) ? 'text-muted' : ''}`}>Publishing
                            House: {validatedBook.publishing_house}</p>
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.gen) ? 'text-muted' : ''}`}>Genre: {validatedBook.gen}</p>
                        <p className="card-text text-success">Price: {validatedBook.price}</p>
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.publication_date) ? 'text-muted' : ''}`}>Published: {validatedBook.publication_date}</p>
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.stock) ? 'text-muted' : ''}`}>Stock: {validatedBook.stock}</p>
                        <p className={`card-text ${isUnknownOrUndefined(validatedBook.short_description) ? 'text-muted' : ''}`}>{validatedBook.short_description}</p>
                        {isAuthenticated() && (
                            role !== 'admin' ? (
                                <>
                                    <div className="quantity-selector mb-2">
                                        <label htmlFor={`quantity-${id}`} className="form-label">Quantity:</label>
                                        <input
                                            id={`quantity-${id}`}
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                            className="form-control"
                                            style={{width: '70px'}}
                                            disabled={validatedBook.stock === 0}
                                        />
                                    </div>
                                    <button className="btn btn-primary" onClick={handleAddToCart} disabled={validatedBook.stock === 0} >
                                        {validatedBook.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-primary m-1" onClick={handleUpdate}>
                                        Update
                                    </button>
                                    <button className="btn btn-danger m-1" onClick={handleDelete}>
                                        Delete
                                    </button>
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>

        <UpdateStockModal
            show={showModal}
            handleClose={handleModalClose}
            bookId={id}
            currentStock={stock}
            onUpdate={updateBookStock}
        />
    </>
    );
}
export default BookItem;
