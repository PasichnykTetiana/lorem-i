import { createContext, FC, PropsWithChildren, ReactNode, useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useToggle } from 'react-use'

import routes from '../../pages'

type AppTheme = string | 'dark' | 'light' | 'default'

type Size = 'small' | 'middle' | 'large'

type AppProps = {
  burger: { opened: boolean; toggle: VoidFunction }
  ui: { theme: AppTheme; size: Size }
}

const defaultValue: AppProps = {
  burger: { opened: false, toggle: () => undefined },
  ui: { theme: 'default', size: 'middle' },
}

const Context = createContext<AppProps>(defaultValue)

const ContextProvider: FC<PropsWithChildren<Partial<ReactNode>>> = ({ children }) => {
  const [opened, toggle] = useToggle(false)

  return <Context.Provider value={{ ...defaultValue, burger: { opened, toggle } }}>{children}</Context.Provider>
}

const Pages = () => <RouterProvider router={createBrowserRouter(routes)} />

const App: FC = () => (
  <ContextProvider>
    <Pages />
  </ContextProvider>
)

export { App }
