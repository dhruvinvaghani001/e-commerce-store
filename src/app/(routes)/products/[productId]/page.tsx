import getProducts from "@/actions/get-products.ts";
import getProduct from "@/actions/get-product.ts";
import React from "react";
import ProductList from "@/components/products/product-list";
import Gallery from "@/components/products/product-gallery";
import ProductInfo from "@/components/products/product-info";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProduct(params.productId);
  return {
    title: product.name,
    openGraph: {
      images: [product.images[0].url],
    },
  };
}

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const productId = params.productId;
  const product = await getProduct(productId);

  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

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
