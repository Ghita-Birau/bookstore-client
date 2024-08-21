import create from 'zustand';
import { persist } from 'zustand/middleware';
import {fetchUser, loginUser, registerUser, updateUser} from "../apiRoutes/userRoutes";

const useUserStore = create(
    persist(
        (set, get) => ({
            user: {
                id: null,
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
            },
            error: null,
            loading: false,

            setUser: (userData) => set((state) => ({
                user: { ...state.user, ...userData },
            })),

            isAuthenticated: () => !!localStorage.getItem('token'),

            register: async () => {
                set({ loading: true, error: null });
                try {
                    const user = get().user;

                    const userData = {
                        ...user,
                        role: 'user',
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
                        const { user } = response.data;

                        set({
                            user: {
                                ...user,
                            },
                            loading: false,
                        });
                    } else {
                        set({ error: 'Login failed. Please check your credentials.', loading: false });
                    }
                } catch (err) {
                    set({ error: 'An error occurred during login. Please try again.', loading: false });
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                set({
                    user: {
                        id: null,
                        firstname: '',
                        lastname: '',
                        username: '',
                        email: '',
                        password: '',
                    },
                    error: null,
                    loading: false,
                });
            },

            loadUserDetails: async () => {
                try {
                    set({ loading: true });
                    const token = localStorage.getItem('token');
                    if (!token) throw new Error('No token found');

                    const user = await fetchUser(token);
                    set({ user, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },

            updateUser: async (updatedData) => {
                try {
                    set({ loading: true });
                    const token = localStorage.getItem('token');
                    if (!token) throw new Error('No token found');

                    const user = await updateUser(updatedData, token);
                    set({ user, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },

        }),
        {
            name: 'user-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useUserStore;
