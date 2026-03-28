import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../utils";
import { selectUserError, selectUserLoading } from "../../selectors";
import { addUserAsync } from "../../actions";
import { Input } from "../../components";
import styles from "./Form.module.css";

const formSchema = yup.object().shape({
  name: yup.string().required("ФИО обязательно").min(3, "Минимум 3 символа"),
  phone: yup
    .string()
    .required("Номер телефона обязателен")
    .min(12, "Минимум 12 символов"),
  problem: yup.string().max(500, "Описание слишком длинное"),
});

export const Form = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(null);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      problem: "",
    },
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onNameChange = async (e) => {
    const value = e.target.value;
    setValue("name", value, { shouldTouch: true });
    await trigger("name");
  };

  const onPhoneChange = async (e) => {
    const value = e.target.value;
    const formattedPhone = formatPhoneNumber(value);
    setValue("phone", formattedPhone, { shouldTouch: true });
    await trigger("phone");
  };

  const onSubmit = (data) => {
    setSuccessMessage(null);
    const res = dispatch(addUserAsync(data));
    if (res) {
      setSuccessMessage("Заявка успешно отправлена!");
      reset();
      setTimeout(() => setSuccessMessage(null), 2000);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h1>Запись к врачу</h1>
      <Input
        label="ФИО:"
        id="name"
        type="text"
        {...register("name")}
        onChange={onNameChange}
        error={touchedFields.name ? errors.name?.message : null}
      />
      <Input
        label="Номер телефона:"
        id="phone"
        type="text"
        placeholder="+7 (      )"
        {...register("phone")}
        onChange={onPhoneChange}
        error={touchedFields.phone ? errors.phone?.message : null}
      />
      <div className={styles.problemField}>
        <label htmlFor={"problem"}>Опишите вашу проблему:</label>
        <textarea id="problem" {...register("problem")} />
        {errors.problem && (
          <span className={styles.errorText}>{errors.problem.message}</span>
        )}
      </div>
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};
