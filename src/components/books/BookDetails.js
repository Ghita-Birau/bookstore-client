import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBook } from '../../apiRoutes/booksRoutes';
import { useNavigate} from "react-router-dom";
import useOrderStore from '../../stores/useOrderStore';

const bookCache = new Map();
function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const addToCart = useOrderStore((state) => state.addToCart)

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

    const handleAddToCart = () => {
        if (quantity > book.stock) {
            alert(`Only ${book.stock} copies available in stock. Please adjust the quantity.`);
            return;
        }

        addToCart({ ...book, quantity });
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
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

            <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />
            </div>

            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>


        </div>
    );
}

export default BookDetails;
