import { PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Typography } from "antd";
import { useGetPartnerOffers } from "../../api/endpoints/partner-offers/partner-offers";
import { PartnerOffersTable } from "./ui/PartnerOffersTable";

function PartnerOffersPage() {
  const partnerOffersQuery = useGetPartnerOffers();
  const response = partnerOffersQuery.data;
  const isSuccessResponse =
    response?.status === 200 && Array.isArray(response.data.offers);
  const offers = isSuccessResponse ? response.data.offers : [];
  const isError =
    partnerOffersQuery.isError ||
    (response !== undefined && !isSuccessResponse);

  return (
    <Flex vertical gap="large" style={{ width: "100%" }}>
      <Flex align="flex-start" justify="space-between" gap="middle">
        <Flex vertical gap="small">
          <Typography.Title level={2} style={{ margin: 0 }}>
            Офферы
          </Typography.Title>
          <Typography.Text type="secondary">
            Управляйте предложениями для сотрудников
          </Typography.Text>
        </Flex>

        <Button type="primary" icon={<PlusOutlined />}>
          Добавить оффер
        </Button>
      </Flex>

      {isError ? (
        <Alert
          showIcon
          type="error"
          message="Не удалось загрузить офферы"
        />
      ) : (
        <PartnerOffersTable
          offers={offers}
          isLoading={partnerOffersQuery.isPending}
        />
      )}
    </Flex>
  );
}

export default PartnerOffersPage;
