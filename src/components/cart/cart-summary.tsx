"use client";

import { useCartStore } from "@/hook/use-cart";
import formatter from "@/lib/formatter";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

const CartSummary = () => {
  const cart = useCartStore();
  const searchParams = useSearchParams();
  const items = useCartStore((state) => state.items);
  const removeAll = useCartStore((state) => state.removeAll);

  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user;

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Order Placed");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Someting Went Wrong!");
    }
  }, [searchParams, removeAll]);

  const total = cart.items.reduce((acc, curr) => {
    return acc + Number(curr.price) * Number(curr.quantity);
  }, 0);

  const onCheckout = async () => {
    if (!user) {
      router.push("/signin?callbackUrl=/cart");
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
          {
            products: items.map((item) => ({
              id: item.id,
              quantity: item.quantity,
            })),
            userId: user?.id!,
          }
        );
        window.location = response.data.url;
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          // The server responded with a status code outside of 2xx
          const errorMessage =
            error.response.data.message || "An error occurred during checkout.";
          toast.error(errorMessage);
          console.error("Server error:", errorMessage);
        }
        toast.error(error?.response?.data?.message || "Something went wrong!");
      }
    }
  };

  return (
    <div className="mt-16 rounded-lg  bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t pt-4  border-gray-200">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <div className="font-semibold">{formatter.format(Number(total))}</div>
        </div>
      </div>
      <div className="mt-6 w-full ">
        <Button
          className="rounded-full w-full "
          disabled={cart.items.length == 0}
          onClick={onCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
