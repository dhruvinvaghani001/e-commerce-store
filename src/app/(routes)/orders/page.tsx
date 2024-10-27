import getOrders from "@/actions/get-orders";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import OrderClient from "@/components/orders/order-client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Order History",
  description:
    "Access your order history to easily track all your past purchases. Stay informed about delivery statuses, view product details, and manage returns effortlessly with our user-friendly interface.",
};

const OrderPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id || !session.user) {
    redirect("/");
  }
  const orders = await getOrders(session.user.id);
  console.log(orders);
  return (
    <div className="max-w-7xl mx-auto">
      <OrderClient orders={orders} />
    </div>
  );
};

export default OrderPage;
