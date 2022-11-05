import { FC, lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { DefaultLayout }  from '../components/layout'

const Home = lazy<FC>(() => import('./home'))

const routes: RouteObject[] = [
  {
    path: '',
    element: <DefaultLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
    ],
  },
]

export { routes as default }
