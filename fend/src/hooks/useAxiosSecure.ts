import { appConfig } from "@/config";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: appConfig.api,
  headers: {
    "x-origin-key": "lottaverse2.0_by@oxwd3v",
  },
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
