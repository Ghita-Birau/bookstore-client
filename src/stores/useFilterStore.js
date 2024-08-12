import create from 'zustand';
import { fetchFilters, fetchBooks} from "../apiRoutes";

const useFilterStore = create((set, get) => ({
    filters: {
        gen: [],
        author: [],
        publishing_house: [],
        minPrice: '',
        maxPrice: '',
        startDate: null,
        endDate: null
    },
    sort: {
        field: '',
        order: '',
    },
    books: [],
    page: 1,
    limit: 21,
    total: 0,
    filterOptions: {
        filters: [],
        genres: [],
        authors: [],
        publishingHouses: [],
        minPrice: 0,
        maxPrice: 1000,
        startDate: null,
        endDate: null,
        labels: {}
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
        return { filters: newFilters, page: 1 };
    }),
    setBooks: (books) => set({ books }),
    setTotal: (total) => set({ total }),
    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),
    setSort: (field, order) => set({ sort: { field, order } }),
    setFilterOptions: (options) => set({ filterOptions: options }),
    setError: (error) => set ({error}),
    clearFilters: () => set({
        filters: {
            gen: [],
            author: [],
            publishing_house: [],
            minPrice: '',
            maxPrice: '',
            startDate: null,
            endDate: null
        },
        books: [],
        sort: {
            field: '',
            order: '',
        },
        page: 1,
        limit: 21,
    }),
    loadFilterOptions: async () => {
        try {
            const response = await fetchFilters();
            const options = {
                filters: [],
                labels: {}
            }

            const mapping = {
                'price': {
                    handler: (filter) => {
                        options.minPrice = parseFloat(filter.value.minPrice);
                        options.maxPrice = parseFloat(filter.value.maxPrice);
                        options.labels.price = filter.label;
                        options.filters.push(filter);
                    }
                },
                'date': {
                    handler: (filter) => {
                        options.labels.date = filter.label;
                        options.startDate = filter.value.startDate;
                        options.endDate = filter.value.endDate;
                        options.filters.push(filter);
                    }
                }
            };

            response.filters.forEach(filter => {
                if (mapping[filter.key]) {
                    mapping[filter.key].handler(filter);
                } else {
                    if (filter.key === 'gen' || filter.key === 'author' || filter.key === 'publishing_house') {
                        options.labels[filter.key] = filter.label;
                        options[filter.key === 'gen' ? 'genres' : filter.key === 'author' ? 'authors' : 'publishingHouses'] = filter.value;
                        options.filters.push(filter);
                    }
                }
            });
            //console.log("Filter options populated:", options);
            set({ filterOptions: options });
        } catch (error) {
            console.error('Error fetching filters:', error);
            set({ error });
        }
    },
    loadBooks: async () => {
        try {
            const state = get();
            const { filters, sort, limit, page } = state;
            console.log('Fetching books with:', { filters, sort, limit, page });
            const response = await fetchBooks({ ...filters, sortBy: sort.field, sortOrder: sort.order, limit, page });
            console.log('Received books:', response.books);
            console.log('Total books:', response.total);
            set({ books: response.books, total: response.total });
        } catch (error) {
            console.error('Error fetching books:', error);
            set({ error });
        }
    }
}));

export default useFilterStore;
