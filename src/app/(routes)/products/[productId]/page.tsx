import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";
import React from "react";
import ProductList from "@/components/product-list";
import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/product-info";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const productId = params.productId;
  const product = await getProduct(productId);
  console.log("PDT");
  console.log(product);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });
  console.log("SUGGESTED PDT");
  console.log(suggestedProducts);
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 ">
      <div className="px-4 py-10 sm:px-6 lg:px-8 ">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Gallery images={product.images} />
          <div className="mt-10 px-4 sm:mt-16 sm:px-6 lg:mt-0">
            <ProductInfo product={product} />
          </div>
        </div>
        <hr />
        <ProductList title="Realted Iteams" products={suggestedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
