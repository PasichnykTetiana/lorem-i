import { type FC, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import DefaultLayout from "../components/layout/DefaultLayout";

const Home = lazy<FC>(async () => await import("./home"));
const About = lazy<FC>(async () => await import("./about"));

const Auth = lazy<FC>(async () => await import("./registration"));
const Login = lazy<FC>(async () => await import("./login"));
const NotFound = lazy<FC>(async () => await import("./not-found"));
const Product = lazy<FC>(async () => await import("./product"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      // {
      //   path: 'login',
      //   element: <Login />},
      {
        path: "registration",
        element: <Auth />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export { routes as default };
