import React from 'react';
import useOrderStore from "../../stores/useOrderStore";
import { calculateTotalPricePerItem, calculateTotalPrice} from "./cartUtils";

function CartDetails({onClose}){
    const { cart, updateQuantity, removeFromCart, placeOrder } = useOrderStore();
    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId);
        } else {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            console.log(cart);
            await placeOrder();
            onClose();
            alert('Order placed and books updated successfully!');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert('Failed to place order or update books. Please try again.');
            }
        }
    };

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
            <h5>Total Price: ${calculateTotalPrice(cart)}</h5>
            <button className="btn btn-secondary" onClick={onClose}>Exit</button>
            <button className="btn btn-primary" onClick={handlePlaceOrder}>Place order</button>
        </div>
    );
}

export default CartDetails;
