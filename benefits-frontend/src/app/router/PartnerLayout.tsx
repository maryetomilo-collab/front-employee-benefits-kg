import { Flex, Layout, Tag, Typography, theme } from "antd";
import { Outlet, useParams } from "react-router";
import { useGetPartner } from "../../api/endpoints/partners/partners";

const { Content, Header } = Layout;

export function PartnerLayout() {
  const { token } = theme.useToken();
  const { partnerId = "" } = useParams();
  const partnerQuery = useGetPartner(partnerId, {
    query: { enabled: Boolean(partnerId) },
  });
  const partner = // TODO: Обработка ошибок
    partnerQuery.data?.status === 200 ? partnerQuery.data.data : undefined;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: token.colorBgContainer,
        }}
      >
        {partner ? (
          <Flex align="center" gap={token.marginLG}>
            <Flex vertical align='start' gap={token.marginXXS} >
              <Typography.Title level={4} style={{ margin: 0 }}>
                {partner.name}
              </Typography.Title>
              <Typography.Text type="secondary">
                ID партнёра: {partner.id}
              </Typography.Text>
            </Flex>
            <Tag color="success" variant='outlined'>
              АКТИВЕН
            </Tag>
          </Flex>
        ) : null}
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
  );
}

export default PartnerLayout;
