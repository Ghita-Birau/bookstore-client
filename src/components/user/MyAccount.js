import React, { useState } from 'react';
import UserDetailsDisplay from './UserDetailsDisplay';
import ChangeUserDetails from './ChangeUserDetails';
import '../../styles/MyAccount.css';
import useUserStore from "../../stores/useUserStore";

function MyAccount() {
    const {handleEditClick, isEditing} = useUserStore();

    return (
        <div className="my-account-container">
            <div className="account-sections">
                {!isEditing ? (
                    <div className="user-details-display">
                        <UserDetailsDisplay />
                        <button onClick={handleEditClick} className="btn btn-primary">
                            Edit My Details
                        </button>
                    </div>
                ) : (
                    <div className="user-details">
                        <ChangeUserDetails />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyAccount;
