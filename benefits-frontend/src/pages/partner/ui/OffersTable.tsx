import { Card, Flex, Progress, Table, Tag, Typography, theme } from "antd";
import type { TableColumnsType } from "antd";
import { PartnerOfferStatus, type PartnerOffer } from "../../../api/schemas";

const dateFormatter = new Intl.DateTimeFormat("ru-RU");
const numberFormatter = new Intl.NumberFormat("ru-RU");

type OfferStatusConfig = {
  label: string;
  color?: "success";
};

const offerStatusConfig: Record<PartnerOfferStatus, OfferStatusConfig> = {
  [PartnerOfferStatus.ACTIVE]: {
    label: "АКТИВЕН",
    color: "success",
  },
  [PartnerOfferStatus.DRAFT]: {
    label: "ЧЕРНОВИК",
  },
  [PartnerOfferStatus.ARCHIVED]: {
    label: "АРХИВИРОВАН",
  },
};

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

const columns: TableColumnsType<PartnerOffer> = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
    width: 240,
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    width: 130,
    render: (status: PartnerOfferStatus) => {
      const config = offerStatusConfig[status];

      return (
        <Tag color={config.color} variant="outlined">
          {config.label}
        </Tag>
      );
    },
  },
  {
    title: "Период действия",
    key: "period",
    width: 220,
    render: (_, offer) =>
      `${formatDate(offer.activationDate)} – ${formatDate(offer.expirationDate)}`,
  },
  {
    title: "Доступно кодов",
    dataIndex: "availableCodes",
    key: "availableCodes",
    width: 150,
    render: (availableCodes: number) => numberFormatter.format(availableCodes),
  },
  {
    title: "Использовано",
    key: "usedCodes",
    width: 260,
    render: (_, offer) => (
      <Flex align="center" gap="small">
        <Typography.Text style={{ minWidth: 40 }}>
          {numberFormatter.format(offer.usedCodes)}
        </Typography.Text>
        <Progress
          percent={offer.usagePercent}
          size="small"
          status={offer.usagePercent === 100 ? "success" : "normal"}
        />
      </Flex>
    ),
  },
];

type OffersTableProps = {
  offers: PartnerOffer[];
};

export function OffersTable({ offers }: OffersTableProps) {
  const { token } = theme.useToken();

  return (
    <Card
      title="Мои офферы"
      styles={{
        header: {
          paddingInline: token.paddingMD,
          borderBottom: "none",
        },
        title: {
          textAlign: "start",
        },
        body: {
          paddingBlockStart: 0,
        },
      }}
    >
      <Table<PartnerOffer>
        columns={columns}
        dataSource={offers}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: "Офферов пока нет" }}
        scroll={{ x: 1000 }}
      />
    </Card>
  );
}
