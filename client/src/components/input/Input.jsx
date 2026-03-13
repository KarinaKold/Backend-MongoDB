import styles from "./Input.module.css";

export const Input = ({ label, ...props }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{label}</label>
      <input className={styles.inputField} {...props} />
    </div>
  );
};
