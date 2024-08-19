import React from 'react';

function OrderList({ orders }) {
    return (
        <div className="order-list">
            <h3>My Orders</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <h4>Order #{order.id}</h4>
                        <p>Total Price: ${order.total_price}</p>
                        <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                        <h5>Items:</h5>
                        <ul>
                            {order.items.map(item => (
                                <li key={item.item_id}>
                                    Book ID: {item.book_id}, Quantity: {item.quantity}, Price: ${item.price}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderList;
