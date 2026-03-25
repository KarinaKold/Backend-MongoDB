import { createBrowserRouter } from "react-router";
import { DBTable, Form, Login } from "../pages";
import { App } from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Form /> },
      { path: "/table", element: <DBTable /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);
