import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${apiURL}/order`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const fetchOrdersByUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${apiURL}/orders-by-user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};