import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export  const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currItems = get().items;
        const existingItems = currItems.find((item) => item.id === data.id);
        if (existingItems) {
          return toast.error("Product is Alredy in Cart");
        }
        set({ items: [...get().items, data] });
        toast.success("Iteam add to cart");
      },
      removeItem: (id: string) => {
        const updatedCart = get().items.filter((item) => item.id != id);
        set({ items: updatedCart });
        toast.success("Item removed from Cart");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
