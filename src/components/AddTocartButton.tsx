"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCartStore } from "@/hook/use-cart";
import { Product } from "@/types";
import { MinusCircle, RemoveFormatting, ShoppingCart } from "lucide-react";

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

  return (
    <>
      <Button
        className="flex items-center gap-x-2 "
        onClick={() => {
          if (alredyIncart) {
            cart.removeItem(product.id);
          } else {
            cart.addItem(product);
          }
        }}
        variant={alredyIncart ? "destructive" : "default"}
      >
        {alredyIncart ? (
          <>
            Remove From Cart <MinusCircle></MinusCircle>
          </>
        ) : (
          <>
            {" "}
            Add To Cart <ShoppingCart />{" "}
          </>
        )}
      </Button>
    </>
  );
};

export default AddTocartButton;
