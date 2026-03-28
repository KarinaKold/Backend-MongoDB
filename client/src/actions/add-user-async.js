import { ACTION_TYPE } from "./action-type";
import { request } from "../utils";

export const addUserAsync = (data) => async (dispatch) => {
  dispatch({ type: ACTION_TYPE.ADD_USER_REQUEST });
  try {
    const res = await request("/users/user", "POST", data);

    if (res.error) {
      dispatch({ type: ACTION_TYPE.ADD_USER_FAILURE, payload: res.error });
      return { error: res.error };
    }

    dispatch({ type: ACTION_TYPE.ADD_USER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: ACTION_TYPE.ADD_USER_FAILURE, payload: err.message });
  }
};
