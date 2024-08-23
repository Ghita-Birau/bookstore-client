import React, { useState } from 'react';
import UserDetailsDisplay from './UserDetailsDisplay';
import ChangeUserDetails from './ChangeUserDetails';
import '../../styles/MyAccount.css';
import useUserStore from "../../stores/useUserStore";

function MyAccount() {
    const {handleEditClick, handleCancelClick, isEditing} = useUserStore();

    // const handleEditClick = () => {
    //     set({ isEditing: true });
    // };
    //
    // const handleCancelClick = () => {
    //     setIsEditing(false);
    // };

    return (
        <div className="my-account-container">
            <div className="account-sections">
                {!isEditing ? (
                    <div className="user-details-display">
                        <UserDetailsDisplay />
                        <button onClick={handleEditClick} className="btn btn-primary">
                            Change Details
                        </button>
                    </div>
                ) : (
                    <div className="user-details">
                        <ChangeUserDetails />
                        <button onClick={handleCancelClick} className="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyAccount;
