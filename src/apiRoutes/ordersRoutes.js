import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;


export const placeOrder = async (orderData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${apiURL}/order`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const fetchOrdersByUser = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiURL}/order`, {
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