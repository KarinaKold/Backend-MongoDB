import { useEffect, useState } from "react";
import styles from "./DBTable.module.css";
import { Input } from "../../components";

export const DBTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("http://localhost:5000/api/requests");
      const data = await response.json();
      setRequests(data);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  // if (loading) return <p>Loading...</p>;

  const filteredRequests = requests.filter((request) =>
    request.name.toLowerCase().includes(search.toLowerCase()),
  );

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
          {filteredRequests.map((request) => (
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
