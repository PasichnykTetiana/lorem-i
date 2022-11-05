import { Spin } from 'antd'
import { FC } from 'react'
import { Content } from './Content'

const Loader: FC = () => (
  <Content>
    <Spin size={'small'} />
  </Content>
)

export { Loader }
