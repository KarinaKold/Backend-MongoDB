import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../../components";
import styles from "./Login.module.css";
import { request } from "../../utils";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const response = request("/login", "POST", { email, password }).then(
      ({ error }) => {
        if (error) {
          // setServerError(`Ошибка запроса ${error}`);
          return;
        }
      },
    );

    if (response) {
      navigate("/table");
    }
  };

  // const formError = errors?.email?.message || errors?.password?.message;
  // const errorMessage = formError || serverError;

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
