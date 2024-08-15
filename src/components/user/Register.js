import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';
import useUserStore  from '../../stores/useUserStore';
import RegisterFormField from "./RegisterFormField";
function Register() {
    const { user, setUser, register, error, loading } = useUserStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register();

        if (!error) {
            console.log("Registration successful, navigating to login.");
            navigate('/login');
        } else {
            console.log("Registration failed with error:", error);
        }
    };

    const fields = [
        { key: 'firstname', label: 'First Name:', type: 'text' },
        { key: 'lastname', label: 'Last Name:', type: 'text' },
        { key: 'username', label: 'Username:', type: 'text' },
        { key: 'email', label: 'Email:', type: 'email' },
        { key: 'password', label: 'Password:', type: 'password' },
    ];

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <RegisterFormField
                        key={field.key}
                        field={field}
                        value={user[field.key]}
                        onChange={handleChange}
                    />
                ))}
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
