import { Link } from "react-router";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header>
      <nav className={styles.navbar}>
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login</Link>
      </nav>
    </header>
  );
};
