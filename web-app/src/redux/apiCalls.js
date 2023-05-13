import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import axios from 'axios';


export const login = async (dispatch, user) => {
  const URL = process.env.REACT_APP_API_URL;
  dispatch(loginStart());

  try {
    const res = await axios.post(`http://${URL}:5000/api/auth/login`, user);
    dispatch(loginSuccess(res.data));
   

  } catch (err) {
    dispatch(loginFailure());
  }
};