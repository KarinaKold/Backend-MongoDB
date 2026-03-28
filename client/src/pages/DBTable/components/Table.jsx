import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchUsersDataAsync } from "../../actions";
import {
  selectLastPage,
  selectUsersData,
  selectUsersDataError,
  selectUsersDataLoading,
} from "../../selectors";
import { Input, Pagination } from "../../components";
import { debounce } from "../../utils";
import styles from "./Table.module.css";

export const Table = () => {
  return (
    <table className={styles.table}>
              <thead>
                <tr>
                  <th>ФИО</th>
                  <th>Телефон</th>
                  <th>Проблема</th>
                  <th>Дата и время</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.problem}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
  )
}
