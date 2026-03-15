import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../../components";
import styles from "./DBTable.module.css";

export const DBTable = () => {
  const [requests, setRequests] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const [page, setPage] = useState(1);
  // const [lastPage, setLastPage] = useState(1);
  // const [searchPhrase, setSearchPhrase] = useState("");
  // const [shouldSearch, setshouldSearch] = useState(false);

  useEffect(() => {
    fetch(
      "/api/table",
      // `/api/table?search=${searchPhrase}&page=${page}&limit=5`,
    )
      .then((response) => response.json())
      .then(({ data, ok }) => {
        if (ok) {
          setRequests(data);
        } else {
          navigate("/login");
        }
      });
  }, [navigate]);

  // if (loading) return <p>Loading...</p>;

  // const filteredRequests = requests.filter((request) =>
  //   request.name.toLowerCase().includes(search.toLowerCase()),
  // );

  return (
    <div className={styles.tableContainer}>
      <h2>Заявки с формы</h2>
      <Input
        type="text"
        placeholder="Поиск по заявкам..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.name}</td>
              <td>{request.phone}</td>
              <td>{request.problem}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
