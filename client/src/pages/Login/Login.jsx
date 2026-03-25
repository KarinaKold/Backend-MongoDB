import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input } from "../../components";
import styles from "./Login.module.css";
import { request } from "../../utils";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Электронная почта обязательна")
    .email("Введите корректный email"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(6, "Введите не менее 6 символов"),
});

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setServerError(null);
    setLoading(true);

    try {
      const res = await request("/login", "POST", data);

      if (res.error) {
        setServerError(res.error);
        return;
      }
      navigate("/table");
    } catch (err) {
      setServerError("Ошибка сервера");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/">Home</Link>
      <form
        className={styles.loginContainer}
        onSubmit={handleSubmit(handleLogin)}
      >
        <h2>Login</h2>
        <Input
          label="Электронная почта"
          id="email"
          type="email"
          {...register("email")}
          error={touchedFields.email ? errors.email?.message : null}
        />
        <Input
          label="Пароль"
          id="password"
          type="password"
          {...register("password")}
          error={touchedFields.password ? errors.password?.message : null}
        />
        <Button type="submit" disabled={loading}>
          Войти
        </Button>
        {serverError && <span className={styles.error}>{serverError}</span>}
      </form>
    </>
  );
};
