import React from "react";
import NoResult from "../no-results";
import Order from "./order";
import { Order as OrderType } from "@/types";

const OrderClient = ({ orders }: { orders: OrderType[] }) => {
  return (
    <div className="max-w-7xl mx-auto pb-10 px-2 p-10 md:px-6 lg:px-0">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
      </div>
      <div className="mt-12 ">
        {orders.length === 0 && <NoResult />}
        <div className="gap-y-2">
          {orders.map((order, index) => (
            <Order order={order} key={order.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderClient;
