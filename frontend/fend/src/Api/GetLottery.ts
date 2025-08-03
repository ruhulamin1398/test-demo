import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";

export const GetLottery = () => {
  const [lotteries, setLotteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const getData = async () => {
    const { data } = await axiosSecure.get("/get-Lotteries");
    setLotteries(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return { lotteries, loading };
};
