import { ACTION_TYPE } from "./action-type";
import { request } from "../utils";

export const authAsync = (data) => async (dispatch) => {
  dispatch({ type: ACTION_TYPE.SET_OPERATOR_REQUEST });
  try {
    const res = await request("/login", "POST", data);

    if (res.error) {
      dispatch({ type: ACTION_TYPE.SET_OPERATOR_FAILURE, payload: res.error });
      return { error: res.error };
    }

    dispatch({ type: ACTION_TYPE.SET_OPERATOR_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: ACTION_TYPE.SET_OPERATOR_FAILURE, payload: err.message });
  }
};
