import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {deleteBook, fetchBook, updateBookStock} from '../../apiRoutes/booksRoutes';
import { useNavigate} from "react-router-dom";
import useOrderStore from '../../stores/useOrderStore';
import {jwtDecode} from "jwt-decode";
import UpdateStockModal from "./UpdateStockModal";
import useUserStore from "../../stores/useUserStore";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const addToCart = useOrderStore((state) => state.addToCart);
    const getBookFromCache = useOrderStore((state) => state.getBookFromCache);
    const setBookInCache = useOrderStore((state) => state.setBookInCache);
    const {bookCache} = useOrderStore();
    const { isAuthenticated } = useUserStore();

    const token = localStorage.getItem('token');
    let role = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        role = decodedToken.role;
    }
    const loadBook = async (ignoreCache = false) => {
        if (!ignoreCache) {
            const cachedBook = getBookFromCache(id);
            if (cachedBook) {
                setBook(cachedBook);
                return;
            }
        }
        try {
            const data = await fetchBook(id);
            setBookInCache(id, data);
            setBook(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadBook();
    }, [id, bookCache]);

    useEffect(() => {
        const cachedBook = getBookFromCache(id);
        if (cachedBook) {
            setBook(cachedBook);
        }
    }, [id]);

    const handleAddToCart = () => {
        if (quantity > book.stock) {
            alert(`Only ${book.stock} copies available in stock. Please adjust the quantity.`);
            return;
        }
        addToCart({...book }, quantity);
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!book) {
        return <div>Book not found!</div>;
    }

    return (
        <div className="container">
            {showAlert && (
                <div className="alert alert-success mt-3">
                    Book added to cart!
                </div>
            )}
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
            <h1>{book.title}</h1>
            <img src={book.image_url} alt={book.title} className="img-fluid"/>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publishing House:</strong> {book.publishing_house}</p>
            <p><strong>Genre:</strong> {book.gen}</p>
            <p><strong>Price:</strong> {book.price}</p>
            <p><strong>Published:</strong> {new Date(book.publication_date).toLocaleDateString()}</p>
            <p><strong>Stock: </strong> {book.stock}</p>
            <p>{book.long_description}</p>
            {isAuthenticated() && (
                role === 'user' ? (
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
                                disabled={book.stock === 0}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleAddToCart} disabled={book.stock === 0}>
                            {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </>
                ) : (
                    <div className="d-flex">
                        <button className="btn btn-primary me-2" onClick={handleUpdate}>
                            Update
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                )
            )}

            <UpdateStockModal
                show={showModal}
                handleClose={handleModalClose}
                bookId={id}
                currentStock={book.stock}
                onUpdate={updateBookStock}
            />
        </div>
    );
}

export default BookDetails;
