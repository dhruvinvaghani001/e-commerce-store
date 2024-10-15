import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string) => {
  const res = await fetch(`${URL}/${id}`);
  const data = await res.json();
  return data?.data;
};

export default getBillboard;
