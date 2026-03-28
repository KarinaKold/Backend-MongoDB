import { ACTION_TYPE } from "../actions";

const initialState = {
  id: null,
  email: null,
  isAuth: false,
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
    case ACTION_TYPE.SET_OPERATOR_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        error: null,
        email: payload.email,
      };
    case ACTION_TYPE.SET_OPERATOR_FAILURE:
      return {
        ...initialState,
        error: payload,
      };
    case ACTION_TYPE.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
