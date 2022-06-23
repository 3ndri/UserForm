import { Table, Space } from "antd";
import { useSelector } from "react-redux";

export default ({ users, columns }) => {
  return <Table dataSource={users} columns={columns} />;
};
