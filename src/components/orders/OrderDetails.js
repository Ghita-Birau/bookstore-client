import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrderById } from '../../apiRoutes/ordersRoutes';
import useOrderStore from "../../stores/useOrderStore";

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const data = await fetchOrderById(orderId);
                setOrder(data);
            } catch (error) {
                setError(error.message);
            }
        };

        loadOrder();
    }, [orderId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!order) {
        return <div>Loading...</div>;
    }

    const calculateTotalPrice = () => {
        return order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="container mt-5">
            <h1>Order Details</h1>
            <h3>Order ID: {order.id}</h3>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <h4>Total Price: ${calculateTotalPrice()}</h4>
            <table className="table">
                <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {order.items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderDetails;
