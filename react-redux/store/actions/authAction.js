import {
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SIGNUP_SUCCESS,
  } from "../constant";
  
  export const loginSuccess = (data) => {
    return {
      type: USER_LOGIN_SUCCESS,
      payload: data,
    };
  };
  
  export const loginError = (data) => {
    return {
      type: USER_LOGIN_ERROR,
      payload: data,
    };
  };
  
  export const logout = (data) => {
    return {
      type: USER_LOGOUT,
      payload: data,
    };
  };
  
  export const signupSuccess = (data) => {
    return {
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    };
  };