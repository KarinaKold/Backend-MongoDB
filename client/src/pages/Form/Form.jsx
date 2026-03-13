import { useState } from "react";
import { Input } from "../../components";
import styles from "./Form.module.css";

export const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const formattedPhone = input
      .replace(/^(d{1})(d{3})(d{3})(d{2})(d{2})$/, "+$1 ($2) $3-$4-$5")
      .replace(/^(\+7 (d{3})) (d{3})-(d{2})-(d{2}).*/, "$1 $2-$3-$4");

    setPhone(formattedPhone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, problem }),
      });

      if (response.ok) {
        setMessage("Заявка успешно отправлена!");
        setName("");
        setPhone("");
        setProblem("");
      } else {
        throw new Error("Ошибка при отправке заявки");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
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
