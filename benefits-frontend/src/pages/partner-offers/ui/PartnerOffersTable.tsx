import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import {
  OfferStatus,
  type PartnerOfferListItemResponse,
} from "../../../api/schemas";

const dateFormatter = new Intl.DateTimeFormat("ru-RU");
const numberFormatter = new Intl.NumberFormat("ru-RU");

type OfferStatusConfig = {
  label: string;
  color?: "success";
};

const offerStatusConfig: Record<OfferStatus, OfferStatusConfig> = {
  [OfferStatus.DRAFT]: {
    label: "ЧЕРНОВИК",
  },
  [OfferStatus.ACTIVE]: {
    label: "АКТИВЕН",
    color: "success",
  },
  [OfferStatus.EXPIRED]: {
    label: "ИСТЁК",
  },
};

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

const columns: TableColumnsType<PartnerOfferListItemResponse> = [
  {
    title: "Название",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    render: (status: OfferStatus) => {
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
    key: "validityPeriod",
    render: (_, offer) =>
      `${formatDate(offer.validFrom)} – ${formatDate(offer.validTo)}`,
  },
  {
    title: "Доступно кодов",
    dataIndex: "availableCodes",
    key: "availableCodes",
    render: (availableCodes: number) => numberFormatter.format(availableCodes),
  },
  {
    title: "Всего кодов",
    dataIndex: "totalCodes",
    key: "totalCodes",
    render: (totalCodes: number) => numberFormatter.format(totalCodes),
  },
];

type PartnerOffersTableProps = {
  offers: PartnerOfferListItemResponse[];
  isLoading: boolean;
};

export function PartnerOffersTable({
  offers,
  isLoading,
}: PartnerOffersTableProps) {
  return (
    <Table<PartnerOfferListItemResponse>
      columns={columns}
      dataSource={offers}
      rowKey="id"
      loading={isLoading}
      pagination={false}
      locale={{ emptyText: "Офферов пока нет" }}
    />
  );
}
