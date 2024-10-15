const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  return data?.data;
};

export default getColors;
