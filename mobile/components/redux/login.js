import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from 'axios';


export const login = async (dispatch, user) => {
  const BASE_URL = process.env.BASE_URL

  dispatch(loginStart());
  try {
    const res = await axios.post(`https://${BASE_URL}.fr/api/auth/login`, user);
    dispatch(loginSuccess(res.data));
   

  } catch (err) {
    dispatch(loginFailure());
    console.log(err)
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logout());
};