import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";

export default async function Home() {
  const billboard = await getBillboard("44e32da6-cc7b-438a-8872-7e9e90ec05ed");
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
