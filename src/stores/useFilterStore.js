import create from 'zustand';
import { fetchFilters} from "../apiRoutes";


const useFilterStore = create((set) => ({
    filters: {
        gen: [],
        author: [],
        publishing_house: [],
        minPrice: '',
        maxPrice: '',
        startDate: '',
        endDate: ''
    },
    books: [],
    filterOptions: {
        genres: [],
        authors: [],
        publishingHouses: [],
        minPrice: 0,
        maxPrice: 1000,
    },
    error: null,
    setFilter: (key, value) => set((state) => {
        const newFilters = { ...state.filters };
        if (Array.isArray(newFilters[key])) {
            if (newFilters[key].includes(value)) {
                newFilters[key] = newFilters[key].filter(item => item !== value);
            } else {
                newFilters[key].push(value);
            }
        } else {
            newFilters[key] = value;
        }
        return { filters: newFilters };
    }),
    setBooks: (books) => set({ books }),
    setFilterOptions: (options) => set({ filterOptions: options }),
    setError: (error) => set ({error}),
    clearFilters: () => set({
        filters: {
            gen: [],
            author: [],
            publishing_house: [],
            minPrice: '',
            maxPrice: '',
            startDate: '',
            endDate: ''
        },
        books: [],
    }),
    loadFilterOptions: async () => {
        try {
            const response = await fetchFilters();
            set({ filterOptions: response });
        } catch (error) {
            console.error('Error fetching filters:', error);
            set({ error });
        }
    },
}));

export default useFilterStore;
