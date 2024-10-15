const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  return data?.data;
};

export default getSizes;
