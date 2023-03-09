import "./Content.less";

import { Layout } from "antd";
import { type FC, type PropsWithChildren } from "react";

type ContentProps = { fixed: boolean };

const Content: FC<PropsWithChildren<Partial<ContentProps>>> = ({
  fixed = true,
  children,
}) => (
  <Layout.Content className={fixed ? "ant-layout-content" : undefined}>
    {children}
  </Layout.Content>
);

export { Content };
