import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { selectAuthError, selectAuthLoading } from "../../selectors";
import { authAsync } from "../../actions";
import { Button, Input } from "../../components";
import styles from "./Login.module.css";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Электронная почта обязательна")
    .email("Введите корректный email"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .matches(/^[\w#%]+$/, "Допускаются буквы, цифры и знаки № %")
    .min(6, "Введите не менее 6 символов")
    .max(30, "Неверно заполнен пароль. Максимум 30 символов"),
});

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const serverError = useSelector(selectAuthError);

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

  const handleLogin = async (data) => {
    dispatch(authAsync(data)).then((res) => {
      if (res?.error) return;
      navigate("/table");
    });
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
