import { ACTION_TYPE } from "../actions";

const initialUsersDataState = {
  loading: false,
  error: null,
  users: [],
  lastPage: 1,
};

export const usersReducer = (state = initialUsersDataState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPE.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTION_TYPE.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload.users,
        lastPage: payload.lastPage,
      };
    case ACTION_TYPE.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
