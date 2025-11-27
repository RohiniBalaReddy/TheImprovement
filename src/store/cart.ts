import { create } from "zustand";
import apiClient from "@/utils/apiClient";
import { toast } from "react-hot-toast";

export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity?: number;
  discount?: number;
  originalPrice: number;
  description: string[];
  category: string;
};

type CartState = {
  items: CartItem[];
  total: number;
  hasSynced: boolean;
  discountAmount: number;
  discountPercentage: number;
  setInitialCart: (items: CartItem[]) => void;
  addToCart: (item: CartItem, userId?: number) => Promise<void>;
  increaseQuantity: (item: CartItem, userId?: number) => Promise<void>;
  decreaseQuantity: (item: CartItem, userId?: number) => Promise<void>;
  removeFromCart: (
    id: number,
    category: string,
    userId?: number
  ) => Promise<void>;
  calculateTotal: () => void;
  clearCart: (userid?: number) => void;
  syncCartWithBackend: (userId: number) => Promise<void>;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  hasSynced: false,
  discountAmount: 0,
  discountPercentage: 0,
  setInitialCart: (items) =>
    set((state) => {
      const total = items.reduce(
        (acc, item) => acc + item.price * (item.quantity ?? 1),
        0
      );
      const originalTotal = items.reduce(
        (acc, item) => acc + item.originalPrice * (item.quantity ?? 1),
        0
      );
      const discountAmount = originalTotal - total;
      const discountPercentage = originalTotal
        ? (discountAmount / originalTotal) * 100
        : 0;
      localStorage.setItem("cart", JSON.stringify(items));
      return {
        items,
        total,
        discountAmount,
        discountPercentage,
      };
    }),
  increaseQuantity: async (item, userId) => {
    console.log("item increase", item);
    const state = get();
    const updatedQuantity = parseFloat(item.quantity?.toString() ?? "0") + 1;
    const updatedItem = {
      ...item,
      quantity: updatedQuantity,
      price: parseFloat(item.price?.toString() ?? "0"),
      originalPrice: parseFloat(item.originalPrice?.toString() ?? "0"),
    };
    console.log("updatedItem", updatedItem);
    if (userId) {
      try {
        await apiClient.patch(
          `${apiClient.URLS.cart}/update/${userId}/${item.id}`,
          updatedItem
        );
      } catch (error) {
        console.error("Error increasing item quantity:", error);
        toast.error("Failed to increase item quantity");
        return;
      }
    }

    const updatedItems = state.items.map((i) =>
      i.id === item.id ? updatedItem : i
    );
    set({ items: updatedItems });
    toast.success("Item quantity increased");
  },
  decreaseQuantity: async (item, userId) => {
    const state = get();
    const updatedQuantity = Math.max(
      parseFloat(item.quantity?.toString() ?? "0") - 1,
      0
    );
    const updatedItem = {
      ...item,
      quantity: updatedQuantity,
      price: parseFloat(item.price?.toString() ?? "0"),
      originalPrice: parseFloat(item.originalPrice?.toString() ?? "0"),
    };
    console.log("updatedItem", updatedItem);

    if (updatedQuantity > 0) {
      if (userId) {
        try {
          await apiClient.patch(
            `${apiClient.URLS.cart}/update/${userId}/${item.id}`,
            updatedItem
          );
        } catch (error) {
          console.error("Error decreasing item quantity:", error);
          toast.error("Failed to decrease item quantity");
          return;
        }
      }

      const updatedItems = state.items.map((i) =>
        i.id === item.id ? updatedItem : i
      );
      set({ items: updatedItems });
      toast.success("Item quantity decreased");
    } else {
      await get().removeFromCart(item.id, item.category, userId);
    }
  },

  addToCart: async (item, userId) => {
    const state = get();
    const updatedItem = { ...item, quantity: (item.quantity ?? 0) + 1 };

    if (userId) {
      console.log("updatedItemini", updatedItem);
      try {
        const response = await apiClient.post(
          `${apiClient.URLS.cart}/${userId}`,
          updatedItem
        );
        console.log("response", userId, response);
      } catch (error) {
        console.error("Error adding item to cart:", error);
        toast.error("Failed to add item to cart");
        return;
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      localCart.push(updatedItem);
      localStorage.setItem("cart", JSON.stringify(localCart));
      toast.success("Item added to local cart");
    }

    const existingItem = state.items.find(
      (i) => i.id === item.id && i.category === item.category
    );
    const updatedItems = existingItem
      ? state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity ?? 0) + 1 } : i
        )
      : [...state.items, { ...item, quantity: 1 }];

    const total = updatedItems.reduce(
      (acc, i) => acc + i.price * (i.quantity ?? 1),
      0
    );
    const originalTotal = updatedItems.reduce(
      (acc, i) => acc + i.originalPrice * (i.quantity ?? 1),
      0
    );
    const discountAmount = originalTotal - total;
    const discountPercentage = originalTotal
      ? (discountAmount / originalTotal) * 100
      : 0;

    set({ items: updatedItems, total, discountAmount, discountPercentage });
    toast.success("Item added to cart");
  },

  removeFromCart: async (id, category, userId) => {
    if (userId) {
      try {
        await apiClient.delete(`${apiClient.URLS.cart}/clear/${userId}`);
        toast.success("Cart cleared successfully");
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Failed to remove item from cart");
        return;
      }
    }

    set((state) => {
      const updatedItems = state.items.filter(
        (item) => !(item.id === id && item.category === category)
      );
      const total = updatedItems.reduce(
        (acc, i) => acc + i.price * (i.quantity ?? 1),
        0
      );
      const originalTotal = updatedItems.reduce(
        (acc, i) => acc + i.originalPrice * (i.quantity ?? 1),
        0
      );
      const discountAmount = originalTotal - total;
      const discountPercentage = originalTotal
        ? (discountAmount / originalTotal) * 100
        : 0;

      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems, total, discountAmount, discountPercentage };
    });
    toast.success("Item removed from cart");
  },

  calculateTotal: () =>
    set((state) => {
      const total = state.items.reduce(
        (acc, item) => acc + item.price * (item.quantity ?? 1),
        0
      );
      const originalTotal = state.items.reduce(
        (acc, item) => acc + item.originalPrice * (item.quantity ?? 1),
        0
      );
      const discountAmount = originalTotal - total;
      const discountPercentage = originalTotal
        ? (discountAmount / originalTotal) * 100
        : 0;

      return {
        total,
        discountAmount,
        discountPercentage,
      };
    }),

  clearCart: async (userId?: number) => {
    if (userId) {
      try {
        await apiClient.delete(`${apiClient.URLS.cart}/clear/${userId}`);
        toast.success("Cart cleared successfully");
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart");
        return;
      }
    } else {
      localStorage.removeItem("cart");
    }

    set({
      items: [],
      total: 0,
      discountAmount: 0,
      discountPercentage: 0,
    });
  },

  syncCartWithBackend: async (userId) => {
    if (!userId || get().hasSynced) return;
    set({ hasSynced: true });
    const localCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    try {
      let backendCartItems = [];
      const response = await apiClient.get(`${apiClient.URLS.cart}/${userId}`);
      if (response.status === 200 && response.body?.items) {
        backendCartItems = response.body.items;
      } else {
        console.error("Unexpected response format:", response.data);
      }

      const mergedItems = [...backendCartItems];
      const updatedItems = [] as any;

      localCartItems.forEach((localItem: any) => {
        const sanitizedQuantity = parseInt(localItem.quantity, 10) || 1;
        const matchingItem = mergedItems.find(
          (item) => item.id === localItem.id
        );
        if (matchingItem) {
          if (matchingItem.quantity < sanitizedQuantity) {
            matchingItem.quantity = sanitizedQuantity;
            updatedItems.push(matchingItem);
          }
        } else {
          const newItem = { ...localItem, quantity: sanitizedQuantity };
          mergedItems.push(newItem);
          updatedItems.push(newItem);
        }
      });
      if (updatedItems.length > 0) {
        await apiClient.patch(`${apiClient.URLS.cart}/sync/${userId}`, {
          items: updatedItems,
        });
        // console.log("Updated Items Sent to Backend:", updatedItems);
      } else {
        console.log("No updates needed for backend cart.");
      }

      localStorage.removeItem("cart");
      // console.log("Local Storage After Clearing:", localStorage.getItem('cart'));
      set({ items: mergedItems });
    } catch (error) {
      console.error("Error syncing cart after login:", error);
      toast.error("Failed to sync cart");
    }
  },
}));
