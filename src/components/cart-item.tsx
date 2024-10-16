"use client";
import { useCartStore } from "@/hook/use-cart";
import formatter from "@/lib/formatter";
import { CartProduct, Product } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface CartItemProps {
  data: CartProduct;
}

const CartItem = ({ data }: CartItemProps) => {
  const cart = useCartStore();
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <div className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt={data.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0 border-2 rounded-full p-1">
          <X onClick={onRemove} size={16} />
        </div>
        <div className="relative  pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black  ">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className=" text-gray-500  ">{data.color.name}</p>
            <p className=" text-gray-500  ml-4 border-l border-gray-200 pl-4">
              {data.size.name}
            </p>
          </div>
          <div className="font-semibold">
            {formatter.format(Number(data.price))}
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          {/* <p>Quantity : {data.quantity}</p> */}
          <div className="flex gap-x-3 items-center">
            <Button
              onClick={() => {
                cart.increaseQuantity(data.id, data.stockQuanity);
              }}
              variant={"ghost"}
            >
              <Plus className="h-4 w-4 " />
            </Button>
            {data.quantity}
            <Button
              onClick={() => {
                cart.decreaseQuantity(data.id);
              }}
              variant={"ghost"}
            >
              <Minus className="h-4 w-4 " />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
