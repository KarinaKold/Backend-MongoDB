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
import styles from "./DBTable.module.css";

const PAGINATION_LIMIT = 5;

export const DBTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsersData);
  const lastPage = useSelector(selectLastPage);
  const loading = useSelector(selectUsersDataLoading);
  const error = useSelector(selectUsersDataError);
  const [page, setPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState("");
  const [sort, setSort] = useState({ field: "createdAt", order: "desc" });

  useEffect(() => {
    dispatch(
      fetchUsersDataAsync(
        shouldSearch,
        page,
        PAGINATION_LIMIT,
        sort.field,
        sort.order,
      ),
    ).then((res) => {
      if (res?.error) navigate("/login");
    });
  }, [dispatch, navigate, page, shouldSearch, sort]);

  const handleSort = (field) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === "desc" ? "asc" : "desc",
    }));
  };

  const sortStatus = (field) => {
    if (sort.field === field) {
      return sort.order === "asc" ? "▲" : "▼";
    }
    return "↕sort";
  };

  const startDelayedSearch = useMemo(
    () =>
      debounce((value) => {
        setShouldSearch(value);
        setPage(1);
      }, 2000),
    [],
  );

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(target.value);
  };

  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.tableContainer}>
      <h2>Заявки с формы</h2>
      <Input
        type="text"
        placeholder="Поиск по заявкам..."
        value={searchPhrase}
        onChange={onSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                ФИО {sortStatus("name")}
              </th>
              <th>Телефон</th>
              <th>Проблема</th>
              <th onClick={() => handleSort("createdAt")}>
                Дата и время {sortStatus("createdAt")}
              </th>
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
      ) : (
        <div>Заявки отсутствуют</div>
      )}
      {!loading && lastPage > 1 && users.length > 0 && (
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      )}
    </div>
  );
};
