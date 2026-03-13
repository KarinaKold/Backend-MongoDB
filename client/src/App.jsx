import { Outlet } from "react-router";
import { Header } from "./components";

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
