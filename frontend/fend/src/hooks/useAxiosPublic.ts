import axios from "axios";
import { appConfig } from "@/config";
const axiosPublic = axios.create({
  baseURL: appConfig.api,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
