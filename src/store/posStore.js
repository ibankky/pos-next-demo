import { create } from "zustand";

const usePosStore = create((set, get) => ({
  selectedItems: [],
  totalAmount: 0,
  totalebonus: 0,
  totalecoin: 0,
  memberTelephone: "",
  member: {
    phone: '',
    name: ''
  },
  cardDataStore: {
    card_no: "",
    card_type: "",
    e_coin: 0,
    e_bonus: 0,
  },

  // เพิ่ม item ลงใน selectedItems
  addItem: (newItem) =>
    set((state) => {
      const existingIndex = state.selectedItems.findIndex(
        (item) =>
          item.menu_id === newItem.menu_id && item.price === newItem.price
      );

      if (newItem.code === "STD0001") {
        console.log(" case เติม เงิน");
      }

      let updatedItems;

      if (existingIndex !== -1) {
        const updated = [...state.selectedItems];
        const existing = updated[existingIndex];
        const newQty = existing.qty + 1;

        updated[existingIndex] = {
          ...existing,
          qty: newQty,
          totalprice: (newItem.price ?? 0) * newQty,
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
            totalprice: newItem.price ?? 0,
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
        (sum, item) => sum + (item.totalebonus ?? 0),
        0
      );
      const totalecoin = updatedItems.reduce(
        (sum, item) => sum + (item.totalecoin ?? 0),
        0
      );

      return {
        selectedItems: updatedItems,
        totalAmount,
        totalebonus,
        totalecoin,
      };
    }),
    updateItemQty: (menuId, qty) =>
      set((state) => {
        const updatedItems = state.selectedItems.map((item) =>
          item.menu_id === menuId ? { ...item, qty } : item
        );
        return {
          selectedItems: updatedItems,
          totalAmount: updatedItems.reduce((sum, i) => sum + i.price * i.qty, 0),
          totalecoin: updatedItems.reduce((sum, i) => sum + (i.e_coin || 0) * i.qty, 0),
          totalebonus: updatedItems.reduce((sum, i) => sum + (i.e_bonus || 0) * i.qty, 0),
        };
      }),  

  clearItems: () =>
    set({ selectedItems: [], totalAmount: 0, totalebonus: 0, totalecoin: 0 }),
  setCardData: (data) => set({ cardDataStore: data }),
  clearCardData: () =>
    set({
      cardDataStore: {
        card_no: "",
        card_type: "",
      },
    }),
  setMember: (data) => set({ member: data }),
  clearMember:  () => {
    set({
      member: {
        phone: '',
        name: ''
      },
    })
  },
  clearTelePhone: () => {
    set({
      memberTelephone: "",
    });
  },
  removeItemByMenuId: (menuId) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter(
        (item) => item.menu_id !== menuId
      ),
    })),
}));

export default usePosStore;
