import getOrders from "@/actions/get-orders";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import OrderClient from "@/components/orders/order-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

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
