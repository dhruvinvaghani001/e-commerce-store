import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query) => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query?.colorId,
      sizeId: query?.sizeId,
      categoryId: query?.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  
  const res = await fetch(url);
  const data = await res.json();
  
  return data?.data;
};

export default getProducts;
