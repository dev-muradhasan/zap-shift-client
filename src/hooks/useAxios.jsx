import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zap-shift-server-rouge.vercel.app",
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;