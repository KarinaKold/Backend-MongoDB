import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthEmail } from "../../selectors";
import styles from "./Header.module.css";
import { logout } from "../../actions";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(selectAuthEmail);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <nav className={styles.navbar}>
        {email !== null ? (
          <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/table"}>Table</NavLink>
            <span>{email}</span>
            <span onClick={onLogout}>
              <a>Logout</a>
            </span>
          </>
        ) : (
          <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/login"}>Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};
