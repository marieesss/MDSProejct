import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import axios from 'axios';

// Fonction pour effectuer une demande de connexion
export const login = (dispatch, user) => {
  const URL = process.env.REACT_APP_API_URL;

  // Appelle l'action loginStart pour indiquer le début de la connexion
  dispatch(loginStart());

  // Retourne une promesse pour permettre une gestion asynchrone
  return new Promise(async (resolve, reject) => {
    try {
      // Effectue une requête POST vers l'URL d'authentification avec les données utilisateur
      const res = await axios.post(`https://${URL}/api/auth/login`, user);

      // Appelle l'action loginSuccess avec les données de réponse pour mettre à jour l'état de l'utilisateur
      dispatch(loginSuccess(res.data));

      // Résout la promesse avec les données de réponse
      resolve(res.data);
    } catch (err) {
      // En cas d'erreur, appelle l'action loginFailure pour indiquer que la connexion a échoué
      dispatch(loginFailure());

      // Rejette la promesse avec l'erreur rencontrée
      reject(err);
    }
  });
};
