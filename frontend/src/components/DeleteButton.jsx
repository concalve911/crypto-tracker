import { Button } from "antd";
import { DeleteOutlined, CloseOutlined } from "@ant-design/icons";

export default function DeleteButton({ type, uniqueId, onDelete, style }) {
  const icon = type === "table" ? <DeleteOutlined /> : <CloseOutlined />;

  return (
    <Button
      type="text"
      danger
      icon={icon}
      style={style}
      onClick={() => {
        onDelete(uniqueId);
      }}
    />
  );
}
