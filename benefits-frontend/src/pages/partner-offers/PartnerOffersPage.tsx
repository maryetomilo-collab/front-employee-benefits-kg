import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Typography } from "antd";
import { useNavigate } from "react-router";
import { useGetPartnerOffers } from "../../api/endpoints/partner-offers/partner-offers";
import { PartnerOffersTable } from "./ui/PartnerOffersTable";

function PartnerOffersPage() {
  const navigate = useNavigate();
  const partnerOffersQuery = useGetPartnerOffers();
  const response = partnerOffersQuery.data;
  const isSuccessResponse =
    response?.status === 200 && Array.isArray(response.data.offers);
  const offers = isSuccessResponse ? response.data.offers : [];
  const isError =
    partnerOffersQuery.isError ||
    (response !== undefined && !isSuccessResponse);
  const handleBack = () => {
    void navigate(-1);
  };
  const handleAddOffer = () => {
    void navigate("new");
  };

  return (
    <Flex vertical gap="large" style={{ width: "100%" }}>
      <Flex align="flex-start" justify="space-between" gap="middle">
        <Flex vertical gap="small">
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
          >
            Назад
          </Button>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Офферы
          </Typography.Title>
          <Typography.Text type="secondary">
            Управляйте предложениями для сотрудников
          </Typography.Text>
        </Flex>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddOffer}
        >
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
