"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/hook/use-cart";
import { useRouter } from "next/navigation";
import UserButton from "../auth/UserButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavbarActions = () => {
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const { data: session } = useSession();

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
      <UserButton />
    </div>
  );
};

export default NavbarActions;
