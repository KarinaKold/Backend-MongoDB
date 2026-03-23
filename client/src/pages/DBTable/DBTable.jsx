import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Input, Pagination } from "../../components";
import { debounce, request } from "../../utils";
import styles from "./DBTable.module.css";

const PAGINATION_LIMIT = 5;

export const DBTable = () => {
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    request(
      `/users/list?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
    ).then(({ data: { users, lastPage } }) => {
      setUsers(users);
      setLastPage(lastPage);
      setLoading(false);
    });
  }, [page, searchPhrase]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  if (loading) return <p>Loading...</p>;

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
      {users.length > 0 ? (
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
      {lastPage > 1 && users.length > 0 && (
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      )}
    </div>
  );
};
