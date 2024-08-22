import React, { useEffect } from 'react';
import useUserStore from '../../stores/useUserStore';
import useOrderStore from '../../stores/useOrderStore';
import '../../styles/MyAccount.css';
import UserOrders from './UserOrders';
import ChangeUserDetails from './ChangeUserDetails';
import UserDetailsDisplay from "./UserDetailsDisplay";

function MyAccount() {
    const { loadUserDetails, updateStatus, resetUpdateStatus } = useUserStore();
    const { loadOrdersByUser, userOrders=[] } = useOrderStore();

    useEffect(() => {
        loadUserDetails();
        loadOrdersByUser();
    }, []);

    useEffect(() => {
        if(updateStatus === 'success') {
            loadUserDetails();
            resetUpdateStatus();
        }
    }, [updateStatus]);

    return (
        <div className="my-account-container">
            <h1>My Account</h1>
            <div className="account-sections">
                <div className="user-orders">
                    <h2>My Orders</h2>
                    <UserOrders orders={userOrders}/>
                </div>
                <div className="user-details-display">
                    <UserDetailsDisplay/>
                </div>
                <div className="user-details">
                    <h2>Change User Details</h2>
                    <ChangeUserDetails/>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;
