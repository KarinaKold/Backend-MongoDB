import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router";
import { Input, Pagination } from "../../components";
import { debounce, request } from "../../utils";
import styles from "./DBTable.module.css";

const PAGINATION_LIMIT = 5;

export const DBTable = () => {
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await request(
          `/users/list?search=${shouldSearch}&page=${page}&limit=${PAGINATION_LIMIT}`,
        );

        if (res.error) {
          throw new Error(res.error);
        }

        const { users, lastPage } = res.data || {};

        setUsers(users);
        setLastPage(lastPage);
      } catch (err) {
        setError(err.message || "Ошибка при загрузке данных");
        console.log("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  // const filteredRequests = requests.filter((request) =>
  //   request.name.toLowerCase().includes(search.toLowerCase()),
  // );

  return (
    <div className={styles.tableContainer}>
      <h2>Заявки с формы</h2>
      <Input
        type="text"
        placeholder="Поиск по заявкам..."
        value={searchPhrase}
        // onChange={(e) => setSearch(e.target.value)}
        onChange={onSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
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
      ) : (
        <div>Заявки отсутствуют</div>
      )}
      {!loading && lastPage > 1 && users.length > 0 && (
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      )}
    </div>
  );
};
