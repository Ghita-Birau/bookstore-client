import create from 'zustand';
import { createOrder} from "../apiRoutes/ordersRoutes";

const useOrderStore = create((set) => ({
    cart: [],
    //orders: [],

    addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            return {
                cart: state.cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                ),
            };
        } else {
            return {
                cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
            };
        }
    }),

    updateQuantity: (itemId, newQuantity) => set((state) => ({
        cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ),
    })),

    removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId)
    })),

    placeOrder: async (orderData) => {
        try {
            const order = await createOrder(orderData);

            set((state) => ({
                orders: [...state.orders, order],
                cart: []
            }));
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    },
}));

export default useOrderStore;
