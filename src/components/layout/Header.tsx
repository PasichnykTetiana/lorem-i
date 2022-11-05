import { Col, Row} from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import img from './img/logo.png'

const Header: FC = () => {
  return (
    <>
      <Row wrap={false} align={'middle'} justify={'space-between'}>
        <Col span={6}>
          <Link to={'/'}>
            <img width={200} src={img} />
          </Link>
        </Col>
        <Col span={18}></Col>
      </Row>
    </>
  )
}

export { Header }
