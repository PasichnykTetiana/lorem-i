import './DefaultLayout.less'

import { Drawer, Layout } from 'antd'
import { FC, useEffect,useContext, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from './Loader'
import {observer} from "mobx-react-lite";
//import { Navigation } from 'src/components/menu/Navigation'
import { Content } from './Content'
import { Footer } from './Footer'
import Header from './Header'
import {Context} from "../app";


const DefaultLayout: FC = () => {
     const {store} = useContext(Context);
    //
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         console.log( store.checkAuth())
    //         store.checkAuth()
    //     }
    // }, [])

    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>
          <Header />

      </Layout.Header>
      <Suspense fallback={<Loader />}>
          <Content>
        <Outlet />
          </Content>
      </Suspense>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>

    </Layout>
  )
}

export { DefaultLayout }