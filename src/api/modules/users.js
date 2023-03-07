import axiosInstance from '@/api/axiosInstance';

const getCurrentUserAPI = async () => {
    const url = `${import.meta.env.VITE_APP_API_ENDPOINT}/user/me`;
    return await axiosInstance.get(url);
};

export default {
    getCurrentUserAPI,
};
