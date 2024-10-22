import formatter from "@/lib/formatter";
import { Product } from "@/types";
import React from "react";
import AddTocartButton from "../cart/add-to-cart-button";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
 
  return (
    <div>
      <h1 className="font-bold text-3xl text-gray-900">{product.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          {formatter.format(Number(product.price))}
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{product?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: product.color.value }}
          />
        </div>
        {product.stockQuanity == 0 && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Out Of Stock</h3>
          </div>
        )}
      </div>
      {product.stockQuanity != 0 && (
        <div className="mt-10 flex items-center gap-x-3">
          <AddTocartButton product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
