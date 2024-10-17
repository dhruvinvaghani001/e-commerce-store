"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hook/use-cart";
import { Product } from "@/types";
import { Minus, Plus } from "lucide-react";

const AddTocartButton = ({ product }: { product: Product }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cart = useCartStore();

  if (!mounted) {
    return null;
  }

  const alredyIncart = cart.items.find((item) => item.id == product.id);
  const q = cart.items.find((item) => item.id == product.id);

  const cartProduct = {
    ...product,
    quantity: 0,
  };

  return (
    <>
      <div className="flex gap-x-3 items-center">
        <Button
          onClick={() => {
            cart.decreaseQuantity(product.id);
          }}
          variant={"ghost"}
        >
          <Minus className="h-4 w-4 " />
        </Button>
        {q?.quantity || 0}
        <Button
          onClick={() => {
            if (!q?.quantity) {
              cart.addItem(cartProduct);
              return;
            }
            cart.increaseQuantity(product.id, product.stockQuanity);
          }}
          variant={"ghost"}
        >
          <Plus className="h-4 w-4 " />
        </Button>
      </div>
    </>
  );
};

export default AddTocartButton;
