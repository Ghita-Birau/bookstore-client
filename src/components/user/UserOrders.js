import React from 'react';

function UserOrders({ orders }) {
    return (
        <div className="user-orders">
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Price</th>
                        <th>Date</th>
                        <th>Items</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>${order.total_price}</td>
                            <td>{new Date(order.order_date).toLocaleDateString()}</td>
                            <td>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.quantity} x {item.book_id}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserOrders;
