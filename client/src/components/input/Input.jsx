import styles from "./Input.module.css";

export const Input = ({ label, error, ...props }, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{label}</label>
      <input ref={ref} className={styles.inputField} {...props} />
      {error && <span className={styles.inputField_error}>{error}</span>}
    </div>
  );
};
