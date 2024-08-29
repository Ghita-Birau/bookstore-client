import create from 'zustand';
import {fetchOrders, placeOrder} from "../apiRoutes/ordersRoutes";
import {fetchBook} from "../apiRoutes/booksRoutes";
import useFilterStore from "./useFilterStore";

const useOrderStore = create((set) => ({
    cart: [],
    orders: [],
    bookCache: new Map(),
    showCart: false,
    userOrder: [],

    openCart: () => set({ showCart: true }),
    closeCart: () => set({ showCart: false }),

    updateQuantity: (itemId, newQuantity) => set((state) => ({
        cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ),
    })),

    removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId)
    })),

    addToCart: (item, quantity = 1) => set((state) => {
        console.log("Adding to cart:", item);
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            return {
                cart: state.cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                ),
            };
        } else {
            return {
                cart: [...state.cart, { ...item, quantity }],
            };
        }
    }),

    cacheBook: async (id) => {
        const state = useOrderStore.getState();

        const cachedBook = state.getBookFromCache(id);
        if (cachedBook) {
            console.log(`Cache hit for book ID ${id}`, cachedBook);
            return cachedBook;
        }

        console.log(`Fetching book ID ${id} from API`);

        try {
            const data = await fetchBook(id);
            console.log("Fetched data to cache:", data);

            state.setBookInCache(id, data);
            console.log("Updated cache:", Array.from(state.bookCache.entries()));

            return data;
        } catch (error) {
            console.error(`Error fetching book with ID ${id}:`, error);
            throw error;
        }
    },

    placeOrder: async () => {
        try {
            const state = useOrderStore.getState();
            const orderData = {
                items: state.cart.map(item => ({
                    book_id: item.id,
                    quantity: item.quantity,
                })),
            };

            const order = await placeOrder(orderData);
            console.log("ORDER:", order);

            if (!order.items || !Array.isArray(order.items)) {
                throw new Error("Structura comenzii nu este corectă sau `items` este absent.");
            }

            const newCache = new Map(state.bookCache);
            const updatedBooks = [];

            for (const item of order.items) {
                const bookId = String(item.book_id);
                const updatedStock = item.updated_stock;
                console.log(`Processing book ID ${bookId} with updated stock: ${updatedStock}`);

                const cachedBook = await state.cacheBook(bookId);

                cachedBook.stock = updatedStock;
                newCache.set(bookId, cachedBook);
                updatedBooks.push(cachedBook);
            }

            set({ orders: [...state.orders, order], cart: [], bookCache: newCache });

            const filterStore = useFilterStore.getState();
            const updatedBookList = filterStore.books.map(book =>
                updatedBooks.find(updatedBook => updatedBook.id === book.id) || book
            );

            useFilterStore.setState({ books: updatedBookList });

            return order;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    },

    getBookFromCache: (id) => {
        const cache = useOrderStore.getState().bookCache;
        return cache.get(id);
    },

    setBookInCache: (id, book) => {
        set((state) => {
            const newCache = new Map(state.bookCache);
            newCache.set(id, book);
            console.log("Cache after update:", Array.from(newCache.entries()));
            return { bookCache: newCache };
        });
    },

    loadOrdersByUser: async () => {
        try {
            set({ loading: true });
            const order = await fetchOrders();
            set({ userOrders: order, loading: false });

            const allBookIds = order.flatMap(order =>
                order.items.map(item => item.book_id)
            );
            set({ bookIdsInOrders: allBookIds });

        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useOrderStore;
