import {
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_SIGNUP_SUCCESS,
  } from "../constant";
  
  const initialState = {
    user: {},
    error: "",
    isAuthenticated: false,
    messages: "",
  };
  
  const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case USER_LOGIN_ERROR:
        return {
          ...state,
          error: payload,
        };
  
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          user: payload.user,
          error: null,
          isAuthenticated: true,
          messages: payload.messages,
        };
  
      case USER_LOGOUT:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          messages: "",
        };
  
      case USER_SIGNUP_SUCCESS:
        return {
          ...state,
          user: payload.user,
          error: null,
          isAuthenticated: false,
          messages: payload.messages,
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;

