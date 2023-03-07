import axios from 'axios';
import MSALInstance from '@/auth/auth';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

const baseURL = import.meta.env.VITE_APP_API_ENDPOINT;
const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(async config => {
    const { userId, msalConfig, loginRequest } = MSALInstance;
    if (userId) {
        loginRequest.account = msalConfig.getAccountByHomeId(userId);
        try {
            const response = await msalConfig.acquireTokenSilent(loginRequest);
            config.headers.Authorization = `Bearer ${response.idToken}`;
        } catch (e) {
            if (e instanceof InteractionRequiredAuthError) {
                const response = await msalConfig.acquireTokenRedirect(loginRequest);
                config.headers.Authorization = `Bearer ${response.idToken}`;
            }
        }
    }
    return config;
});

export default axiosInstance;
