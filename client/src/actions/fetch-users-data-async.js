import { ACTION_TYPE } from "./action-type";
import { request } from "../utils";

export const fetchUsersDataAsync =
  (search, page, limit, sortBy = "createdAt", sortOrder = "desc") =>
  async (dispatch) => {
    dispatch({ type: ACTION_TYPE.FETCH_DATA_REQUEST });
    try {
      const res = await request(
        `/users/list?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      );

      if (res.error) {
        dispatch({ type: ACTION_TYPE.FETCH_DATA_FAILURE, payload: res.error });
        return { error: res.error };
      }

      dispatch({ type: ACTION_TYPE.FETCH_DATA_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: ACTION_TYPE.FETCH_DATA_FAILURE, payload: err.message });
    }
  };
