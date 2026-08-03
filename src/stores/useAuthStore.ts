import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserRole = "CITIZEN";

interface User {
  dni: string;
  email: string | null;
  name: string;
  lastName: string | null;
  phone: string | null;
  role: UserRole;
  status: string;
}

interface AuthCredentials {
  accessToken: string;
  refreshToken: string;
}

interface AuthStore {
  user: User | null;
  credentials: AuthCredentials | null;
  isAuth: boolean;
  registerUser: (user: User) => void;
  RemoveUser: () => void;
  registerCredentials: (credential: AuthCredentials) => void;
  updateAccessToken: (accessToken: string) => void;
}

const AUTH_STORE_NAME = "willay-auth";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      credentials: null,
      registerUser: (user) =>
        set({
          user,
          isAuth: true,
        }),
      RemoveUser: () => {
        set({
          isAuth: false,
          user: null,
          credentials: null,
        });

        localStorage.removeItem(AUTH_STORE_NAME);
      },
      registerCredentials: (credentials) =>
        set({
          credentials,
        }),
      updateAccessToken: (accessToken) =>
        set((state) => ({
          credentials: state.credentials
            ? { ...state.credentials, accessToken }
            : null,
        })),
    }),
    {
      name: AUTH_STORE_NAME,
    },
  ),
);
