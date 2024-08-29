import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const fetchFilters = async () => {
    try {
        const response = await axios.get(`${apiURL}/filters`);
        return response.data;
    } catch (error) {
        console.error('Error fetching filters:', error);
        throw error;
    }
};
export const fetchBooks = async (filters, sortBy, sortOrder, limit, page) => {
    try {
        const response = await axios.get(`${apiURL}/filter_books`, { params: filters, sortBy, sortOrder, limit, page });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const fetchBook = async (id) => {
    try {
        const response = await axios.get(`${apiURL}/book/${id}`);
        console.log("Book data fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching book:', error);
        throw  error;
    }
};

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

export const updateBookStock = async (bookId, newStock) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${apiURL}/book/${bookId}`, newStock, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating stock:', error);
        throw error;
    }
};

export const deleteBook = async (bookId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${apiURL}/del_book/${bookId}`, {},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};