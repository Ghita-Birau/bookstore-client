import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';
import useUserStore  from '../../stores/useUserStore';
import FormField from "./FormField";

const fields = [
    { key: 'firstname', label: 'First Name:', type: 'text' },
    { key: 'lastname', label: 'Last Name:', type: 'text' },
    { key: 'username', label: 'Username:', type: 'text' },
    { key: 'email', label: 'Email:', type: 'email' },
    { key: 'password', label: 'Password:', type: 'password' },
];

function Register() {
    const { register, error, loading } = useUserStore();
    const [formData, setFormData] = useState({ firstname: '', lastname: '', username: '', email: '', password: ''});
    const navigate = useNavigate();

    const handleFieldChange = (updatedField) => {
        setFormData((prevData) => ({
            ...prevData,
            ...updatedField,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData);

        if (!error  && !loading) {
            console.log("Registration successful, navigating to login.");
            navigate('/login');
        } else {
            console.log("Registration failed with error:", error);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <FormField
                        key={field.key}
                        field={field}
                        value={formData[field.key] || ''}
                        onValueChange={handleFieldChange}
                    />
                ))}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default Register;
