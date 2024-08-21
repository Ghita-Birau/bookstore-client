import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${apiURL}/register`, userData);
        return response;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${apiURL}/login`, userData);
        const token = response.data.token;
        localStorage.setItem('token', token);
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const fetchUser = async (token) => {
    try {
        const response = await axios.get(`${apiURL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw  error;
    }
};

export const updateUser = async (updatedData, token) => {
    try {
        const response = await axios.put(`${apiURL}/user`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

