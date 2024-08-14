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
        const response = await axios.get(`${apiURL}/filter-books`, { params: filters, sortBy, sortOrder, limit, page });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const fetchBook = async (id) => {
    try {
        const response = await axios.get(`${apiURL}/book/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching book:', error);
        throw  error;
    }
};

export const updateBookStock = async (bookId, quantity) => {
    try {
        const response = await axios.put(`${apiURL}/book/${bookId}`, {
            stock: quantity,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating book stock:', error);
        throw error;
    }
};


