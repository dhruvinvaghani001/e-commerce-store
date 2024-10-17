import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Order as OrderType } from "@/types";
import OrderProduct from "./order-product";

const Order = ({ order }: { order: OrderType }) => {
  const orderTotal = order.orderItems.reduce((acc, cumm) => {
    return acc + Number(cumm.product.price) * cumm.quantity;
  }, 0);

  return (
    <Card className="w-full max-w-4xl mt-2 shadow-lg">
      <CardHeader className="bg-gray-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            Order #{order.id.slice(-6)}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Shipping Details</h3>
            <p className="text-sm">Address: {order.adress}</p>
            <p className="text-sm">Phone: {order.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <p className="text-sm">Total Items: {order.orderItems.length}</p>
            <p className="text-sm font-bold">
              Total Amount: ${orderTotal.toFixed(2)}
            </p>
          </div>
        </div>
        <h3 className="font-semibold mb-4">Order Items</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {order.orderItems.map((item) => (
            <OrderProduct
              key={item.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-end">
        <p className="text-lg font-bold">Total: ${orderTotal.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
};

export default Order;
