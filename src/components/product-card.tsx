"use client";
import { Product } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Expand, ShoppingCart } from "lucide-react";
import formatter from "@/lib/formatter";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 sapce-y-4">
      <div className="aspect-square rouned-xl bg-gray-100 relative">
        <Image
          fill
          src={product?.images[0]?.url}
          alt={product.name}
          className="aspect-sqare object-cover rounded-md"
        />
        <div className="opacity-0  group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center ">
            <button className="rounded-full bg-white shadow-md p-2 hover:scale-110 transition">
              <Expand size={20} className="text-gray-600" onClick={() => {}} />
            </button>
            <button className="rounded-full bg-white shadow-md p-2 hover:scale-110 transition">
              <ShoppingCart
                size={20}
                className="text-gray-600"
                onClick={() => {}}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="font-semibol text-lg">{product.name}</p>
        <p className="text-sm text-gray-500">{product?.category?.name}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="font-semibold">
          {formatter.format(Number(product.price))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
