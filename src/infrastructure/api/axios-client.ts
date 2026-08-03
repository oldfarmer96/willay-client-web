import { useAuthStore } from "@/stores/useAuthStore";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const credentials = useAuthStore.getState().credentials;

  if (credentials) {
    config.headers.Authorization = `Bearer ${credentials.accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const { credentials, updateAccessToken, RemoveUser } =
      useAuthStore.getState();

    try {
      if (!credentials?.refreshToken) {
        RemoveUser();
        return Promise.reject(error);
      }

      const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken: credentials.refreshToken,
      });

      const newAccessToken = refreshResponse.data.accessToken;

      updateAccessToken(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return instance(originalRequest);
    } catch (refreshError) {
      RemoveUser();
      return Promise.reject(refreshError);
    }
  },
);

export default instance;
