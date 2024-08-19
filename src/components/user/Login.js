import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';
import useUserStore from "../../stores/useUserStore";
import FormField from "./FormField";

const fields = [
    { key: 'email', label: 'Email:', type: 'email' },
    { key: 'password', label: 'Password:', type: 'password' },
];

function Login() {
    const { user, setUser, login, error, loading } = useUserStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login();

        if (!error && !loading) {
            console.log("Login successful, navigating to home.");
            navigate('/');
        } else {
            console.log("Login failed with error:", error);
        }
    };

    return (
        <div className="login-container">

            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <FormField
                        key={field.key}
                        field={field}
                        value={user[field.key] || ''}
                        onValueChange={setUser}
                    />
                ))}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="forgot-password">
                    <a href="#">Forgot your password?</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
