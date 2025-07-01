import { create } from 'zustand';

const usePosStore = create((set, get) => ({
    selectedItems: [],
    totalAmount: 0,
    addItem: (item) => {
      const currentItems = get().selectedItems;
      const existingIndex = currentItems.findIndex(
        (i) => i.menu_id === item.menu_id
      );
  
      if (existingIndex !== -1) {
        const updatedItems = [...currentItems];
        const existing = updatedItems[existingIndex];
        const newQty = existing.qty + 1;
  
        updatedItems[existingIndex] = {
          ...existing,
          qty: newQty,
          totalprice: (item.e_coin ?? 0) * newQty,
          totalecoin: (item.e_coin ?? 0) * newQty,
          totalebonus: (item.e_bonus ?? 0) * newQty,
        };
  
        set({ selectedItems: updatedItems });
      } else {
        set({
          selectedItems: [
            ...currentItems,
            {
              ...item,
              qty: 1,
              totalprice: item.e_coin ?? 0,
              totalecoin: item.e_coin ?? 0,
              totalebonus: item.e_bonus ?? 0,
            },
          ],
        });
      }
    },

  clearItems: () => set({ selectedItems: [], totalAmount: 0 }),
}));

export default usePosStore; 
