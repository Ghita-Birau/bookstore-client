import React, { useEffect, useState } from 'react';
import useUserStore from '../../stores/useUserStore';
import { fetchOrdersByUser} from "../../apiRoutes/ordersRoutes";
import { fetchUser, updateUser} from "../../apiRoutes/userRoutes";
import OrderList from './OrderList';
import UserProfile from './UserProfile';

function MyAccount() {
    const { user } = useUserStore();
    const [orders, setOrders] = useState([]);
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: ''
    });

    useEffect(() => {
        const loadUserData = async () => {
            if (user.id) {
                try {
                    const ordersData = await fetchOrdersByUser(user.id);
                    setOrders(ordersData);

                    const profileData = await fetchUser(user.id);
                    setProfile(profileData);
                } catch (error) {
                    console.error('Error loading user data:', error);
                }
            } else {
                console.log('User ID is not available.');
            }
        };

        loadUserData();
    }, [user.id]);


    const handleProfileUpdate = async (updatedProfile) => {
        try {
            const success = await updateUser(user.id, updatedProfile);
            if (success) {
                setProfile(updatedProfile);
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile.');
        }
    };

    return (
        <div className="my-account-container">
            <h2>My Account</h2>
            <div className="my-account-sections">
                <UserProfile profile={profile} onUpdateProfile={handleProfileUpdate} />
                <OrderList orders={orders} />
            </div>
        </div>
    );
}

export default MyAccount;
