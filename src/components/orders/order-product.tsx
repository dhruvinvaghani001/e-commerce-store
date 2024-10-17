import { OrderItem, Product } from "@/types";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";

const OrderProduct = ({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) => {
  console.log(product);
  return (
    <Card className="w-full max-w-[200px] mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <div className="relative w-full pt-[100%]">
        <Image
          src={product.images[0].url}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
          <div className="flex justify-between items-center">
            <Badge variant="secondary" className="text-xs">
              {product.category.name}
            </Badge>
            <span className="text-xs text-gray-600">Qty: {quantity}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm font-bold">
              ${parseFloat(product.price).toFixed(2)}
            </span>
            <div className="text-xs hidden sm:inlinne text-gray-600">
              {product.size.name} | {product.color.name}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderProduct;
