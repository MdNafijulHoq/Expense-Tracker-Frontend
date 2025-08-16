import ComponentLayout from "@/components/layout/ComponentLayout";
import ErrorPage from "@/pages/ErrorPage";
import Expenses from "@/pages/Expenses";
import Homepage from "@/pages/Homepage";
import LogIn from "@/pages/LogIn";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: ComponentLayout,
    path: "/",
    children: [
      {
        Component: Homepage,
        path: "/",
      },
      {
        Component: Expenses,
        path: "/expenses",
      },
    ],
  },
  {
    Component: ErrorPage,
    path: "*",
  },
  {
    Component: LogIn,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
]);
