import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../../components";
import styles from "./Login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const responseData = await response.json();

    if (responseData.ok) {
      navigate("/table");
    }
  };

  return (
    <form className={styles.loginContainer} onSubmit={handleLogin}>
      <h2>Login</h2>
      <Input
        label="Электронная почта"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Пароль"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={styles.button} type="submit">
        Войти
      </button>
      {/* {errorMessage && <span className={styles.error}>{errorMessage}</span>} */}
    </form>
  );
};
