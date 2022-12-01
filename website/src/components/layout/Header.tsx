import {Button, Col, Row, Typography} from 'antd'
import {FC, useContext, useEffect, useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import img from './img/logo.png'
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { toJS } from 'mobx';
import {observer} from "mobx-react-lite";

import  Login  from './Login'
import {Context} from "../app";
import {users} from "../../services/AuthServices";

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const {store} = useContext(Context);

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };


  useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
          console.log(store.userName, 'username 3')
        }

  }, [])

  const items: MenuProps['items'] = [
    {
      label: <Login />,
      key: '0',
    },
    {
      label:          <div>    <NavLink to="/registration">
        <Button type='primary' shape='round' size={'large'}>
          Registration
        </Button>

      </NavLink></div>,
      key: '1',
    },
  ];
  return (
    <>
      <Row wrap={false} align={'middle'} justify={'space-between'}>
        <Col span={6}>
          <Link to={'/'}>
            <img width={200} src={img} />
          </Link>
        </Col>
        <Col>
          {store.isAuth ? <Col>
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
              :
              (<Dropdown menu={{items}}  open={open} onOpenChange={handleOpenChange} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
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

export  default observer(Header)
