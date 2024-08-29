import React, {useEffect} from 'react';
import useOrderStore from "../../stores/useOrderStore";
import '../../styles/MyOrders.css';

function MyOrders() {

    const { loadOrdersByUser, userOrders=[], orders } = useOrderStore();

    useEffect(() => {
        loadOrdersByUser();
    }, [orders]);

    return (
        <div className="my-orders-container">
            {userOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="orders-table">
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Total Price</th>
                        <th>Date</th>
                        <th>Book ID</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userOrders.map((order) => (
                        order.items.map((item, index) => (
                            <tr key={`${order.id}-${index}`}>
                                {index === 0 && (
                                    <>
                                        <td rowSpan={order.items.length}>{order.id}</td>
                                        <td rowSpan={order.items.length}>{order.user_id}</td>
                                        <td rowSpan={order.items.length}>${order.total_price}</td>
                                        <td rowSpan={order.items.length}>{new Date(order.order_date).toLocaleDateString()}</td>
                                    </>
                                )}
                                <td>{item.quantity}</td>
                                <td>{item.book_id}</td>
                            </tr>
                        ))
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MyOrders;
