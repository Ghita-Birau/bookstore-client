import useUserStore from '../../stores/useUserStore';
import {useEffect} from "react";
function UserDetailsDisplay() {

    const {  loadUserDetails, user, loading, error, isEditing} = useUserStore();

    useEffect(() => {
        loadUserDetails();
    }, [isEditing]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user details available. Please log in.</div>;
    }

    return (
        <div className="user-details-display">
            <h2>User Details Display</h2>
            <ul>
                <li><strong>First Name:</strong> {user.firstname}</li>
                <li><strong>Last Name:</strong> {user.lastname}</li>
                <li><strong>Username:</strong> {user.username}</li>
                <li><strong>Email:</strong> {user.email}</li>
            </ul>
        </div>
    );
}

export default UserDetailsDisplay;
