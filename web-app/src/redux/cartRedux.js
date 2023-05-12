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
      const productIndex = state.Product.findIndex(product => product.id === action.payload.id);
      // vérifie si le produit existe déjà dans le tableau
      if (productIndex !== -1) {
        // si le produit existe, ajoute simplement la quantité et met à jour le prix total
        state.Product[productIndex].quantity += 1;
        state.total += action.payload.price;
      } else {
        // si le produit n'existe pas encore, ajoute-le avec une quantité de 1 et met à jour le prix total
        state.Product.push({ ...action.payload, quantity: 1 });
        state.total += action.payload.price;
      }
      state.quantity += 1; // ajoute 1 à la quantité totale de produits
    
    },
    delProduct: (state, action) => {
      console.log(action.payload)
      state.quantity -= action.payload.quantity; // baisse la quantité 
      //filtre et retient tout les produits qui ne sont pas égaux à l'id du produit supprimé 
      state.Product = state.Product.filter(item => item._id !== action.payload._id) 
      state.total -= action.payload.price * action.payload.quantity;
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