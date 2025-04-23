import { Table } from "antd";
import { useCrypto } from "../context/crypto-context";
import DeleteButton from "./DeleteButton";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Delete",
    key: "delete",
    width: 50,
    render: (_, record) => (
      <DeleteButton
        type="table"
        uniqueId={record.uniqueId}
        onDelete={record.removeAsset}
      />
    ),
  },
];

export default function AssetsTable() {
  const { assets, removeAsset } = useCrypto();

  const data = assets.map((a) => ({
    key: a.uniqueId,
    name: a.name,
    price: a.price,
    amount: a.amount,
    uniqueId: a.uniqueId,
    removeAsset,
  }));

  return <Table pagination={false} columns={columns} dataSource={data} />;
}
