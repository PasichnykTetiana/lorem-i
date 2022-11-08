import { FC, lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { DefaultLayout }  from '../components/layout'

const Home = lazy<FC>(() => import('./home'))
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
      { path: "*", element: <NotFound  />},
    ],
  },

]

export { routes as default }
