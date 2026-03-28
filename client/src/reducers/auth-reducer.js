import { ACTION_TYPE } from "../actions";

const savedEmail = sessionStorage.getItem("userEmail");

const initialState = {
  id: null,
  email: savedEmail || null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.SET_OPERATOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTION_TYPE.SET_OPERATOR_SUCCESS: {
      const email = typeof payload === "string" ? payload : payload.email;
      sessionStorage.setItem("userEmail", email);
      return {
        ...state,
        loading: false,
        error: null,
        email: email,
      };
    }
    case ACTION_TYPE.SET_OPERATOR_FAILURE:
      return {
        ...initialState,
        error: payload,
      };
    case ACTION_TYPE.LOGOUT:
      sessionStorage.removeItem("userEmail");
      return initialState;
    default:
      return state;
  }
};
