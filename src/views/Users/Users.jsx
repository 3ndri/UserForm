import React, { useState, useEffect } from "react";
import AddUserModal from "../../components/AddUserModal";
import EditUserModal from "../..//components/EditUserModal";
import UsersTable from "../../components/UsersTable";
import { Button, Space, Modal, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  addUser,
  updateUser,
  deleteUser,
} from "../../redux/reducer";

export default () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userEdit, setUserEdit] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  let editingStudent = [];

  useEffect(() => {
    setUserEdit(selectedUser);
  }, [selectedUser])
  console.log('user edit', userEdit)
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNr",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setSelectedUser(record)
              setIsEditVisible(true);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                onOk: () => {
                  dispatch(deleteUser(record));
                  message.success("User deleted");
                },
              });
            }}
          />
        </Space>
      ),
    },
  ];
  console.log("viss", isVisible);
  console.log("editing", editingStudent);
  console.log("selctedddddddddddddasdas", selectedUser);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          title="Create"
          icon="+ "
          type="primary"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Create New User
        </Button>
      </div>
      <UsersTable users={users} columns={columns} />
      <AddUserModal
        isVisible={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
      />
      <EditUserModal
        selectedUser={userEdit}
        isVisible={isEditVisible}
        onCancel={() => {
          setIsEditVisible(false);
        }}
      />
    </div>
  );
};
