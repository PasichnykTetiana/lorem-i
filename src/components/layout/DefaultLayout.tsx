import './DefaultLayout.less'

import { Drawer, Layout } from 'antd'
import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from './Loader'
//import { Navigation } from 'src/components/menu/Navigation'
import routes from '../../pages/index'
import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'


const DefaultLayout: FC = () => {
    // console.log(routes[0].children)
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

export { DefaultLayout}