import { ACTION_TYPE } from "../actions";

const initialUserState = {
  id: "",
  name: "",
  phone: "",
  problem: "",
  loading: false,
  error: null,
};

export const userReducer = (state = initialUserState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTION_TYPE.ADD_USER_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        error: null,
      };
    case ACTION_TYPE.ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
