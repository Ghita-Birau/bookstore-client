import create from 'zustand';

const useFilterStore = create((set) => ({
    filters: {
        gen: '',
        author: '',
        publishing_house: '',
        minPrice: '',
        maxPrice: '',
        startDate: '',
        endDate: ''
    },
    setFilter: (key, value) => set((state) => {
        const newFilters = { ...state.filters };
        newFilters[key] = value;
        return { filters: newFilters };
    })
}));
export default useFilterStore;
