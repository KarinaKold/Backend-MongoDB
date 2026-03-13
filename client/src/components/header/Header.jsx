import { Link } from "react-router";

export const Header = () => {
  return (
    <header>
      <div>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/login"}>login</Link>
        </nav>
      </div>
    </header>
  );
};
