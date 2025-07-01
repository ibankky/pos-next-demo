import { create } from 'zustand';

const usePosStore = create((set, get) => ({
    selectedItems: [],
    totalAmount: 0,
    totalebonus: 0,
    totalecoin : 0,

  // เพิ่ม item ลงใน selectedItems
  addItem: (newItem) =>
    set((state) => {
      const existingIndex = state.selectedItems.findIndex(
        (item) => item.menu_id === newItem.menu_id
      );

      let updatedItems;

      if (existingIndex !== -1) {
        const updated = [...state.selectedItems];
        const existing = updated[existingIndex];
        const newQty = existing.qty + 1;

        updated[existingIndex] = {
          ...existing,
          qty: newQty,
          totalprice: (newItem.e_coin ?? 0) * newQty,
          totalecoin: (newItem.e_coin ?? 0) * newQty,
          totalebonus: (newItem.e_bonus ?? 0) * newQty,
        };

        updatedItems = updated;
      } else {
        updatedItems = [
          ...state.selectedItems,
          {
            ...newItem,
            qty: 1,
            totalprice: newItem.e_coin ?? 0,
            totalecoin: newItem.e_coin ?? 0,
            totalebonus: newItem.e_bonus ?? 0,
          },
        ];
      }

      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + (item.totalprice ?? 0),
        0
      );

      const totalebonus = updatedItems.reduce(
        (sum, item) => sum + (item.e_bonus ?? 0),
        0
      );
      const totalecoin = updatedItems.reduce(
        (sum, item) => sum + (item.e_coin ?? 0),
        0
      );

      return {
        selectedItems: updatedItems,
        totalAmount,
        totalebonus,
        totalecoin,
      };
    }),

  clearItems: () => set({ selectedItems: [], totalAmount: 0  , totalebonus : 0 , totalecoin : 0}),
}));

export default usePosStore; 
