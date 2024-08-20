import create from 'zustand';
import { createOrder} from "../apiRoutes/ordersRoutes";

const useOrderStore = create((set) => ({
    cart: [],
    orders: [],
    bookCache: new Map(),
    showCart: false,
    orderStatus: null,

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

    placeOrder: async (userId) => {
        try {
            const state = useOrderStore.getState();
            const orderData = {
                user_id: userId,
                items: state.cart.map(item => ({
                    book_id: item.id,
                    quantity: item.quantity,
                })),
            };

            const order = await createOrder(orderData);

            set(() => ({
                orders: [...state.orders, order],
                cart: [],
                orderStatus: 'success',
            }));

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

    resetOrderStatus: () => set({ orderStatus: null })
}));

export default useOrderStore;
