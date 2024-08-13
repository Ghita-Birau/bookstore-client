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

export const fetchOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${apiURL}/order/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

// export const fetchOrders = async () => {
//     try {
//         const response = await axios.get(`${apiURL}/order`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         throw error;
//     }
// };
//

//
// export const updateOrder = async (orderId, updateData) => {
//     try {
//         const response = await axios.put(`${apiURL}/order/${orderId}`, updateData);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating order:', error);
//         throw error;
//     }
// };
//
// export const deleteOrder = async (orderId) => {
//     try {
//         const response = await axios.delete(`${apiURL}/order/${orderId}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error deleting order:', error);
//         throw error;
//     }
// };
