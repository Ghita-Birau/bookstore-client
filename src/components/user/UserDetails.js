import React, { useState } from 'react';

function UserDetails({ user, updateUser }) {
    const [formData, setFormData] = useState({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        username: user.username || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
    };

    return (
        <form className="user-details-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    );
}

export default UserDetails;
