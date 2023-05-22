import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import axios from 'axios';

export const login = (dispatch, user) => {
  const URL = process.env.REACT_APP_API_URL;
  dispatch(loginStart());
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`http://${URL}:80/api/auth/login`, user);
      dispatch(loginSuccess(res.data));
      resolve(res.data);
    } catch (err) {
      dispatch(loginFailure());
      reject(err);
    }
  });
};