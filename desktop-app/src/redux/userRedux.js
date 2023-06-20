import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  // Nom de la tranche (slice) de l'état de l'utilisateur
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isLoggedIn: false
  },
      // Définition des différentes actions pour mettre à jour l'état de l'utilisateur
  reducers: {
    loginStart: (state) => {
      // Action pour indiquer le début de la connexion
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      // Action pour indiquer que la connexion a réussi
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLoggedIn= true;
      state.error = false;
    },
    loginFailure: (state) => {
      // Action pour indiquer que la connexion a échoué
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      // Action pour déconnecter l'utilisateur
      state.currentUser = null;
      state.isLoggedIn= false;
      state.error = false;
    },
  },
});
// Exporte les actions générées par la tranche (slice)
export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
// Exporte le réducteur (reducer) généré par la tranche (slice)
export default userSlice.reducer;