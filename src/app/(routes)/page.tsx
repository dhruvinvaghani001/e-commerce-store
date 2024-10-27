import getBillboard from "@/actions/get-billboard.ts";
import getProducts from "@/actions/get-products.ts";
import Billboard from "@/components/billboard";
import ProductList from "@/components/products/product-list";
import { Metadata } from "next";

export const revalidate = 3600;



export default async function Home() {
  const billboard = await getBillboard("522bdc1d-3cb0-4ac8-9fcc-ed3e38f8e464");
  const featuredProducts = await getProducts({ isFeatured: true });

  return (
    <div className="max-w-7xl mx-auto px-4 pb:10 md:px-0 ">
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
          <ProductList title="featured Products" products={featuredProducts} />
        </div>
      </div>
    </div>
  );
}
