import { createSlice } from "@reduxjs/toolkit";

//creating slice with adding item and removing items onto cart

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },

  reducers: {
    //add items to cart
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addToCart(state, action) {
      const newItems = action.payload;

      const existingItem = state.items.find((item) => item.id === newItems.id);
      state.totalQuantity++;
      state.changed = true;

      //if item not present
      if (!existingItem) {
        state.items.push({
          id: newItems.id,
          title: newItems.title,
          price: newItems.price,
          quantity: 1,
          total: newItems.price,
        });
      }

      //item present already,
      else {
        existingItem.quantity++;
        existingItem.total += existingItem.price;
      }
    },
    //remove items from cart
    removeFromCart(state, action) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      state.totalQuantity--;
      state.changed = true;
      //if more than 1 quantity of product is available
      if (item.quantity > 0) {
        item.quantity--;
        item.total -= item.price;
      }

      //if 1 product is available
      if (item.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
