import create from 'zustand';
import { persist } from 'zustand/middleware';
import {fetchUser, loginUser, registerUser, updateUser} from "../apiRoutes/userRoutes";

const useUserStore = create(
    persist(
        (set, get) => ({
            user: [],
            error: null,
            loading: false,
            isEditing: false,

            isAuthenticated: () => !!localStorage.getItem('token'),

            register: async (formData) => {
                set({ loading: true, error: null });
                try {
                    const response = await registerUser(formData);

                    if (response.status === 201) {
                        set({ loading: false });
                    } else {
                        set({ error: 'Registration failed. Please try again.', loading: false });
                    }
                } catch (err) {
                    set({ error: 'An error occurred during registration. Please try again.', loading: false });
                }
            },

            login: async (formData) => {
                set({ loading: true, error: null });
                try {
                    const response = await loginUser(formData);

                    if (response.status === 200) {
                        const { token } = response.data;
                        localStorage.setItem('token', token);
                        set({ loading: false});
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
                    error: null,
                    loading: false
                });
            },

            loadUserDetails: async () => {
                try {
                    set({ loading: true });
                    const user = await fetchUser();
                    if (!user) throw new Error('User data not found');
                    set({ user, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },

            updateUser: async (updatedData) => {
                try {
                    set({ loading: true });

                    const updatedUser = await updateUser(updatedData);
                        set(() => ({
                            user: updatedUser,
                            loading: false,
                            isEditing: true,
                        }));
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },

            handleEditClick: () => set({ isEditing: true }),
            handleCancelClick: () => set({isEditing: false}),
        }),
        {
            name: 'user-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useUserStore;
