import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';
import useUserStore from "../../stores/useUserStore";

function Login() {
    const { user, setUser, login, error, loading } = useUserStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login();

        if (!error) {
            console.log("Login successful, navigating to home.");
            navigate('/');
        } else {
            console.log("Login failed with error:", error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <div className="forgot-password">
                    <a href="#">Forgot your password?</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
