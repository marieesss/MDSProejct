import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    Product: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.Product.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    resetCart: (state) => {
      state.quantity=0;
      state.Product=[];
      state.total=0;
    },
  },
});

export const { addProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;