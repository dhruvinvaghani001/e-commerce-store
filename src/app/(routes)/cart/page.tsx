"use client";
import CartItem from "@/components/cart-item";
import CartSummary from "@/components/cart-summary";
import NoResult from "@/components/no-results";
import { useCartStore } from "@/hook/use-cart";
import React, { Suspense, useEffect, useState } from "react";

const CartPage = () => {
  const cart = useCartStore();

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
