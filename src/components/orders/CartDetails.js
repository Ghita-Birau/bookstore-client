import React, {useState} from 'react';
import useOrderStore from "../../stores/useOrderStore";

const parsePrice = (price) => {
    if (typeof price === 'string') {
        price = price.replace(/[^\d.-]/g, '');
    }

    const parsed = parseFloat(price);
    return isNaN(parsed) ? 0 : parsed;
};

const calculateTotalPricePerItem = (price, quantity) => {
    const parsedPrice = parsePrice(price);
    console.log('Parsed Price:', parsedPrice, 'Quantity:', quantity);
    return (parsedPrice * quantity).toFixed(2);
};

function CartDetails({userId = 1}){
    const { cart, updateQuantity, removeFromCart, placeOrder } = useOrderStore();
    const [isVisible, setIsVisible] = useState(true);

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0).toFixed(2);
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId);
        } else {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            await placeOrder(userId);
            alert('Order placed successfully!');
        } catch (error) {
            alert('Failed to place order. Please try again.');
        }
    };

    const handleExit = () => {
        setIsVisible(false);
    }

    if(!isVisible) {
        return null;
    }

    return (
        <div className="cart-details">
            <h4>My Shopping cart</h4>
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item) => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                            />
                        </td>
                        <td>${calculateTotalPricePerItem(item.price, item.quantity)}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h5>Total Price: ${calculateTotalPrice()}</h5>
            <button className="btn btn-secondary" onClick={handleExit}>Exit</button>
            <button className="btn btn-primary" onClick={handlePlaceOrder}>Place order</button>
        </div>
    );
}

export default CartDetails;
