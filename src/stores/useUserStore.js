import create from 'zustand';
import {loginUser, registerUser} from "../apiRoutes/userRoutes";

const useUserStore = create((set, get) => ({
    user : {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    },
    error: null,
    loading: false,

    setUser: (userData) => set ((state) => {
        return { user: { ...state.user, ...userData } };
    }),

    register: async () => {
        set({ loading: true, error: null });
        try {
            const user = get().user;

            const userData = {
                ...user,
                role: 'user'
            };

            const response = await registerUser(userData);

            if (response.status === 201) {
                set({ loading: false });
            } else {
                set({ error: 'Registration failed. Please try again.', loading: false });
            }
        } catch (err) {
            set({ error: 'An error occurred during registration. Please try again.', loading: false });
        }
    },

    login: async () => {
        set({ loading: true, error: null });
        try {
            const { email, password } = get().user;

            const response = await loginUser({ email, password });

            if (response.status === 200) {
                set({ user: { ...get().user, ...response.data }, loading: false });
            } else {
                set({ error: 'Login failed. Please check your credentials.', loading: false });
            }
        } catch (err) {
            set({ error: 'An error occurred during login. Please try again.', loading: false });
        }
    },
}));

export default useUserStore;
