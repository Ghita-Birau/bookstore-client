import React, { useState } from 'react';

function UserProfile({ profile, onUpdateProfile }) {
    const [editableProfile, setEditableProfile] = useState(profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableProfile({ ...editableProfile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile(editableProfile);
    };

    return (
        <div className="user-profile">
            <h3>Profile</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={editableProfile.firstname}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={editableProfile.lastname}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={editableProfile.username}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={editableProfile.email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
        </div>
    );
}

export default UserProfile;
