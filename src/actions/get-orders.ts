import axios from "axios";

const getOrders = async (userId: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/orders`,
    {
      userId: userId,
    }
  );
  return response?.data?.data;
};

export default getOrders;
