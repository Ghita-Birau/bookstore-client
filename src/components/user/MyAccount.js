import React, { useEffect } from 'react';
import useUserStore from '../../stores/useUserStore';
import useOrderStore from '../../stores/useOrderStore';
import '../../styles/MyAccount.css';
import UserOrders from './UserOrders';
import UserDetails from './UserDetails';

function MyAccount() {
    const { user, loadUserDetails, updateUser } = useUserStore();
    const { loadOrdersByUser, userOrders=[] } = useOrderStore();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadUserDetails();
            loadOrdersByUser();
        }
    }, [loadUserDetails, loadOrdersByUser]);

    return (
        <div className="my-account-container">
            <h1>My Account</h1>
            <div className="account-sections">
                <div className="user-orders">
                    <h2>My Orders</h2>
                    <UserOrders orders={userOrders}/>
                </div>
                <div className="user-details">
                    <h2>User Details</h2>
                    <UserDetails user={user} updateUser={updateUser}/>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
