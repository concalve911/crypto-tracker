import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../utils";
import { useCrypto } from "../context/crypto-context";
import DeleteButton from "./DeleteButton";

const siderStyle = { padding: "1rem" };

export default function AppSider() {
  const { assets, removeAsset } = useCrypto();

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.uniqueId || asset.id} style={{ marginBottom: "1rem" }}>
          <DeleteButton
            style={{ position: "absolute", top: "10px", right: "10px" }}
            uniqueId={asset.uniqueId}
            onDelete={removeAsset}
          />
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit,
                withTag: true,
              },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
