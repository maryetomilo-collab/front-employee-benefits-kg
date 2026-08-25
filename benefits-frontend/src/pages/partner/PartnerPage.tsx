import {
  BarcodeOutlined,
  CheckCircleOutlined,
  ShopOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Alert, Col, Flex, Row, Skeleton, theme } from "antd";
import { useParams } from "react-router";
import { useGetPartner } from "../../api/endpoints/partners/partners";
import { AnalyticsCard } from "./ui/AnalyticsCard";
import { OffersTable } from "./ui/OffersTable";

const PartnerPage = () => {
  const { token } = theme.useToken();
  const { partnerId = "" } = useParams();
  const partnerQuery = useGetPartner(partnerId, {
    query: { enabled: Boolean(partnerId) },
  });
  const partner =
    partnerQuery.data?.status === 200 ? partnerQuery.data.data : undefined;

  if (partnerQuery.isPending) {
    return (
      <Flex vertical style={{ width: "100%" }}>
        <Skeleton active paragraph={{ rows: 2 }} />
      </Flex>
    );
  }

  if (!partner) {
    return (
      <Alert
        showIcon
        type="error"
        message="Не удалось загрузить данные партнёра"
      />
    );
  }

  const { statistics } = partner;
  const cityLabel =
    statistics.citiesCount % 10 === 1 && statistics.citiesCount % 100 !== 11
      ? "городе"
      : "городах";

  return (
    <Flex vertical gap={token.marginLG} style={{ width: "100%" }}>
      <Row gutter={[token.marginMD, token.marginMD]} style={{ width: "100%" }}>
        <Col xs={24} md={12} lg={6}>
          <AnalyticsCard
            icon={<TagsOutlined />}
            markerColor={token.colorInfo}
            title="Активных офферов"
            value={statistics.activeOffers}
            description={`из ${statistics.totalOffers} всего`}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <AnalyticsCard
            icon={<BarcodeOutlined />}
            markerColor={token.colorSuccess}
            title="Доступных кодов"
            value={statistics.availableCodes}
            description={`из ${statistics.totalCodes} всего`}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <AnalyticsCard
            icon={<CheckCircleOutlined />}
            markerColor="#722ed1"
            title="Использовано кодов"
            value={statistics.usedCodes}
            description="за всё время"
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <AnalyticsCard
            icon={<ShopOutlined />}
            markerColor={token.colorWarning}
            title="Точек"
            value={statistics.locationsCount}
            description={`в ${statistics.citiesCount} ${cityLabel}`}
          />
        </Col>
      </Row>
      <OffersTable offers={partner.offers} />
    </Flex>
  );
};

export default PartnerPage;
