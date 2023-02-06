import { FC, lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import DefaultLayout  from '../components/layout/DefaultLayout'


const Home = lazy<FC>(() => import('./home'))
const Auth = lazy<FC>(() => import('./registration'))
const Login = lazy<FC>(() => import('./login'))
const NotFound = lazy<FC>(() => import('./not-found'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      // {
      //   path: 'login',
      //   element: <Login />},
      {
        path: 'registration',
        element: <Auth />,
      },
      { path: "*", element: <NotFound  />},
    ],
  },

]

export { routes as default }
