"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/hookjs/use-cart";
import { useRouter } from "next/navigation";

const NavbarActions = () => {
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  if (!mounted) {
    return null;
  }

  const cartCount = cart.items.length;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        className="rounded-lg"
        variant={"secondary"}
        onClick={() => {
          router.push("/cart");
        }}
      >
        <ShoppingBag />
        <span className="ml-2 text-lg">{cartCount}</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
