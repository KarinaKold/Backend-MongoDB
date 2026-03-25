import styles from "./Button.module.css";

export const Button = ({ children, onClick, type, disabled, ...props }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
