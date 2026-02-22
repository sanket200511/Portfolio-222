import axios from 'axios';

// Create a configured axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to attach JWT token if it exists in localStorage
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('sentinel_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 Unauthorized globally
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid, auto-logout
            localStorage.removeItem('sentinel_token');
            // We can dispatch a global event here if needed to trigger UI updates
            window.dispatchEvent(new Event('auth-expired'));
        }
        return Promise.reject(error);
    }
);

export default apiClient;
