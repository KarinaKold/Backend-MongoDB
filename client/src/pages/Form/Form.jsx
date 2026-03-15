import { useState } from "react";
import { Input } from "../../components";
import { formatPhoneNumber } from "../../utils";
import styles from "./Form.module.css";

export const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const formattedPhone = formatPhoneNumber(value);
    setPhone(formattedPhone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { name, phone, problem };

    const response = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setLoading(false);
      setName("");
      setPhone("");
      setProblem("");
      setMessage("Заявка успешно отправлена!");
    } else {
      setMessage("Error!");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h1>Запись к врачу</h1>
      <Input
        label="ФИО:"
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Номер телефона:"
        id="phone"
        type="text"
        value={phone}
        placeholder="+7 (      )"
        onChange={handlePhoneChange}
        required
      />
      <div className={styles.problemField}>
        <label htmlFor={"problem"}>Опишите вашу проблему:</label>
        <textarea
          id="problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
      </div>
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};
