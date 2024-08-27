import React, { useState } from 'react';
import {updateUser} from "../../apiRoutes/userRoutes";
import FormField from "./FormField";
import {useNavigate} from "react-router-dom";
import useUserStore from "../../stores/useUserStore";

const fields = [
    { key: 'firstname', label: 'First Name:', type: 'text' },
    { key: 'lastname', label: 'Last Name:', type: 'text' },
    { key: 'username', label: 'Username:', type: 'text' },
    { key: 'email', label: 'Email:', type: 'email' },
    { key: 'password', label: 'Password:', type: 'password' },
];

function ChangeUserDetails() {
    const {handleCancelClick} = useUserStore();
    const [formData, setFormData] = useState({ firstname: '', lastname: '', username: '', email: '', password: ''});
    const handleFieldChange = (updatedField) => {
        setFormData((prevData) => ({
            ...prevData,
            ...updatedField,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(formData);
            console.log('User updated successfully, redirecting now...');
            //navigate('/account');
            handleCancelClick();
            console.log('Redirected');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <form className="user-details-form" onSubmit={handleSubmit}>
            {fields.map((field) => (
                <FormField
                    key={field.key}
                    field={field}
                    value={formData[field.key]}
                    onValueChange={handleFieldChange}
                />
            ))}
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    );
}

export default ChangeUserDetails;
