import { createSlice } from "@reduxjs/toolkit";

// création du slice
const cartSlice = createSlice({
  name: "cart",
  // state initial du slice 
  initialState: {
    Product: [],
    quantity: 0,
    total: 0,
  },
  // fonctions pour modifier l'état du slice 
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;  // ajoute 1 à la quantité
      // ajoute l'objet du produit dans le tableau Produit
      state.Product.push(action.payload); 
      // ajoute le prix du produit multiplié à la quantité
      state.total += action.payload.price * action.payload.quantity; 
    },
    delProduct: (state, action) => {
      state.quantity -= 1; // baisse la quantité 
      //filtre et retient tout les produits qui ne sont pas égaux à l'id du produit supprimé 
      state.Product = state.Product.filter(item => item._id !== action.payload) 
      state.total += action.payload.price * action.payload.quantity;
    }, 
    resetCart: (state) => {
      state.quantity=0;
      state.Product=[];
      state.total=0;
    },
  },
});

export const { addProduct, resetCart, delProduct} = cartSlice.actions;
export default cartSlice.reducer;