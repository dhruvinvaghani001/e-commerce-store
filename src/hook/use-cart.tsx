import { Product, CartProduct } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: CartProduct[];
  addItem: (data: CartProduct) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  increaseQuantity: (id: string, available: number) => void;
  decreaseQuantity: (id: string) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartProduct) => {
        const currItems = get().items;
        const existingItems = currItems.find((item) => item.id === data.id);
        if (existingItems) {
          return toast.error("Product is Alredy in Cart");
        }
        set({ items: [...currItems, { ...data, quantity: 1 }] });
        toast.success("Iteam add to cart");
      },
      removeItem: (id: string) => {
        const updatedCart = get().items.filter((item) => item.id != id);
        set({ items: updatedCart });
        toast.success("Item removed from Cart");
      },
      removeAll: () => set({ items: [] }),
      increaseQuantity: (id: string, available: number) => {
        console.log("Avaialbe", available);
        const currItems = get().items;
        const existingItem = currItems.find((item) => item.id === id);

        if (existingItem) {
          if (existingItem.quantity + 1 > available) {
            toast.error("Cannot increase quantity beyond available stock");
            return;
          }
          if (existingItem.quantity + 1 > 10) {
            toast.error("Cannot add more than 10 Product!");
            return;
          }
          const updatedItems = currItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
          set({ items: updatedItems });
          toast.success("Item quantity increased");
        }
      },
      decreaseQuantity: (id: string) => {
        const currItems = get().items;
        const existingItem = currItems.find((item) => item.id === id);
        if (existingItem) {
          if (existingItem.quantity > 1) {
            const updatedItems = currItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
            set({ items: updatedItems });
            toast.success("Item quantity decreased");
          } else {
            const updatedCart = currItems.filter((item) => item.id !== id);
            set({ items: updatedCart });
            toast.success("Item removed from cart");
          }
        }
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
