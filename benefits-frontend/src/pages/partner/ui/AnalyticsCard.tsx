import { Avatar, Card, Flex, Statistic, Typography } from "antd";
import type { ReactNode } from "react";

type AnalyticsCardProps = {
  icon: ReactNode;
  markerColor: string;
  title: string;
  value: number;
  description: string;
};

export function AnalyticsCard({
  icon,
  markerColor,
  title,
  value,
  description,
}: AnalyticsCardProps) {
  return (
    <Card size="small" style={{ height: "100%" }}>
      <Flex align="flex-start" gap="middle">
        <Avatar
          icon={icon}
          size={48}
          style={{ backgroundColor: markerColor, flexShrink: 0 }}
        />
        <Flex vertical gap="small">
          <Statistic
            title={<Typography.Text type="secondary">{title}</Typography.Text>}
            value={value}
            groupSeparator=" "
          />
          <Typography.Text type="secondary">{description}</Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
}
