import * as actions from "./actions";
import * as hosturl from "../utils/hostURL";
import Axios from "axios";
import jwt_decode from "jwt-decode";

export const loading = (load) => {
  return {
    type: actions.LOADING,
    payload: load,
  };
};

export const cart = (load) => {
  return {
    type: actions.CARTOPEN,
    payload: load,
  };
};


export const logout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("exp_time");
    localStorage.removeItem("authtoken");
    return {
      type: actions.LOGOUT,
    };
  };

  
  export const authcheck = () => (dispatch) => {
    let data = localStorage.getItem("data");
    let authtoken = localStorage.getItem("authtoken");
    data = JSON.parse(data);
    if (data) {
      const expiretime = JSON.parse(localStorage.getItem("exp_time"));
      if (expiretime <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authloadingsuccess(authtoken, data));
      }
    } else {
      dispatch(logout());
    }
  };


  export const authdatastore = (token) => (dispatch) => {
    const tok = token;
    const decoded_token = jwt_decode(token);
    const data = {
      email: decoded_token.email,
      id: decoded_token.user_id,
      username: decoded_token.username,
      token_jti: decoded_token.jti,
      isAdmin: decoded_token.isAdmin,
    };
    const exptime = new Date(decoded_token.exp * 1000);
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("authtoken", JSON.stringify(tok));
    localStorage.setItem("exp_time", JSON.stringify(exptime));
    dispatch(authloadingsuccess(tok, data));
  };
  
  export const authloadingsuccess = (token, data) => {
    return {
      type: actions.AUTHSUCCESS,
      payload: {
        authtoken: token,
        authdata: data,
      },
    };
  };
  
  export const authmessage = (msg) => {
    return {
      type: actions.AUTHMESSAGE,
      payload: msg,
    };
  };
  
  export const authload = (val) => (dispatch) => {
    dispatch(loading(true));
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    Axios.post(`${hosturl.HOSTURL}token/`, val, header)
      .then((response) => {
        if (response.data) {
          dispatch(authdatastore(response.data.access));
        }
      })
      .catch((error) => {
        // dispatch(authmessage(error.response.data.detail));
        dispatch(loading(false));
      });
  };
  