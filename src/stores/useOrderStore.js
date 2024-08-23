import create from 'zustand';
import {fetchOrdersByUser, placeOrder} from "../apiRoutes/ordersRoutes";

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
            console.log("Send order:", order);
            // set(() => ({
            //     orders: [...state.orders, order],
            //     cart: [],
            // }));

            const newCache = new Map(state.bookCache);
            orderData.items.forEach(item => {
                let book = newCache.get(item.book_id);
                if (book) {
                    book.stock -= item.quantity;
                    newCache.set(item.book_id, book);
                }
            });

            set({ orders: [...state.orders, order], cart: [], bookCache: newCache });
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
            return { bookCache: newCache };
        });
    },

    loadOrdersByUser: async () => {
        try {
            set({ loading: true });
            const order = await fetchOrdersByUser();
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
