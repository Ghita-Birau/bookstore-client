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
        return response;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};