import { Layout, Typography, theme } from 'antd'
import { Outlet } from 'react-router'

const { Content, Header } = Layout

export function PartnerLayout() {
  const { token } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Typography.Title level={4} style={{ margin: 0, color: token.colorTextLightSolid }}>
          Employee Benefits
        </Typography.Title>
      </Header>

      <Content
        style={{
          flex: 1,
          padding: token.paddingLG,
          background: token.colorBgLayout,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  )
}

export default PartnerLayout
