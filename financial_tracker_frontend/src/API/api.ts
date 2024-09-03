import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Your API base URL
  timeout: 30000,
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async (): Promise<void> => {
  // Implement your token refresh logic here
  // For example, you might call an endpoint to get a new token
  const response = await api.post('/auth/token/refresh', {
    // Include necessary data for refreshing the token
  });
  const newToken = response.data.token;
  // Store the new token (e.g., in localStorage or a cookie)
  localStorage.setItem('token', newToken); //Change this to your token storage method
};

// Function to call the API with token refresh logic
const callAPI = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error('401 Unauthorized Error:', error);
      try {
        await refreshToken();
        // Retry the original request with the new token
        const newConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const response = await axios(newConfig);
        return response;
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw refreshError;
      }
    } else {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default api ;