import getBillboard from "@/actions/get-billboard.ts";
import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Filter from "@/components/ui/filter";
import React from "react";
interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId?: string;
    sizeId?: string;
  };
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const categoryProducts = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const category = await getCategory(params.categoryId);
  const billboard = await getBillboard(category.billboardId);
  const sizes = await getSizes();
  const colors = await getColors();

  return (
    <div className="max-w-7xl  mx-auto px-4 md:px-0 ">
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div>
              <Filter valueKey={"sizeId"} data={sizes} name="Sizes" />
              <Filter valueKey={"colorId"} data={colors} name="Colors" />
            </div>
            <div className="lg:col-span-4">
              <ProductList title={category.name} products={categoryProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
