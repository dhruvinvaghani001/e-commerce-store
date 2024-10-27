"use client";
import React, { Suspense } from "react";

import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import NoResult from "@/components/no-results";

import { useCartStore } from "@/hook/use-cart";
import { useSession } from "next-auth/react";
import { Metadata } from "next";

const CartPage = () => {
  const cart = useCartStore();
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="max-w-7xl mx-auto pb-10 px-4 md:px-0">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {cart.items.length == 0 && <NoResult />}
            <ul>
              {cart.items.map((item) => (
                <CartItem key={item.id} data={item} />
              ))}
            </ul>
          </div>
          <Suspense>
            <CartSummary />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
