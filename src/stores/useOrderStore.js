import create from 'zustand';
import { createOrder} from "../apiRoutes/ordersRoutes";

const useOrderStore = create((set) => ({
    cart: [],
    orders: [],

    addToCart: (item) => set((state) => ({
        cart: [...state.cart, item]
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
