import { Button, Col, Row, Typography, Menu, Dropdown, Space } from 'antd'
import { type FC, useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import img from './img/logo.png'

import type { MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useBreakpoints } from '../../components/screen'
import Login from './Login'
import { Context } from '../app'
import { SvgIcon } from '../icon/SvgIcon'

const Header: FC = () => {
  const [open, setOpen] = useState(false)
  const { store } = useContext(Context)
  const { isDesktop } = useBreakpoints()
  const handleOpenChange = (flag: boolean) => {
    setOpen(flag)
  }
  const data = [
    { title: 'About us', href: '/about' }
  ]
  const items: MenuProps['items'] = [
    {
      label: <Login/>,
      key: '0'
    },
    {
      label: <div><NavLink to="/registration">
                <Button type='primary' shape='round' size={'large'}>
                    Registration
                </Button>

            </NavLink></div>,
      key: '1'
    }
  ]

  return (
        <>
            <Row wrap={false} align={'middle'} justify={'space-between'}>

                <Col>
                    <Link to={'/'}>
                        <img width={200} src={img}/>
                    </Link>
                </Col>
                <Col>
                    {isDesktop
                      ? (
                        <Menu mode='horizontal'>
                            {data.map(it => (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={it?.title}>
                                        <SvgIcon type={'dot'}/>
                                    <Menu.Item>
                                        <Link to={it?.href}>
                                            <Typography.Title style={{ margin: 0 }} level={5}>{it?.title}</Typography.Title>
                                        </Link>
                                    </Menu.Item>
                                        <SvgIcon type={'dot'}/>
                                </div>
                            ))}
                        </Menu>
                        )
                      : <div>d</div>}
                </Col>
                <Col>
                    {store.isAuth
                      ? <Col>
                            <Row gutter={16} justify={'space-between'}>
                                <Col>
                                    <Typography.Title level={5}>{store.userName}</Typography.Title>
                                </Col>
                                <Col>
                                    <Button onClick={() => store.logout()} type="primary" htmlType="submit">
                                        Log out
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                      : (<Dropdown menu={{ items }} open={open} onOpenChange={handleOpenChange} trigger={['click']}>
                            <a onClick={(e) => { e.preventDefault() }}>
                                <Space>
                                    Log in
                                </Space>
                            </a>
                        </Dropdown>)}
                </Col>
            </Row>
        </>
  )
}

export default observer(Header)
