import create from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser } from "../apiRoutes/userRoutes";

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
                token: null,
            },
            error: null,
            loading: false,

            setUser: (userData) => set((state) => ({
                user: { ...state.user, ...userData },
            })),

            isAuthenticated: () => !!get().user.token,

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
                        const { token, user } = response.data;

                        set({
                            user: {
                                ...user,
                                token,
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
                set({
                    user: {
                        id: null,
                        firstname: '',
                        lastname: '',
                        username: '',
                        email: '',
                        password: '',
                        token: null,
                    },
                    error: null,
                    loading: false,
                });
            },

        }),
        {
            name: 'user-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useUserStore;
