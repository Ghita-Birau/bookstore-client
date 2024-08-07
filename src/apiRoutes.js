import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const fetchBooks = async (filters) => {
    try {
        const response = await axios.get(`${apiURL}/filter-books`, { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const fetchFilters = async () => {
    try {
        const response = await axios.get(`${apiURL}/filters`);
        return response.data;
    } catch (error) {
        console.error('Error fetching filters:', error);
        throw error;
    }
};
