import { Table, Input, Button } from "antd";
import { useState } from "react";
import styles from './TableComponent.module.css';
import { AddModal } from "../Add-modal/Add-modal";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../redux/selectors";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Data } from "../../interfaces/interfaces";
import type { AppDispatch } from "../../redux/store";
import { removeFromTable } from "../../redux/slices";

export const TableComponent = () => {
  const data = useSelector(selectItems());
  const dispatch = useDispatch<AppDispatch>();

  const columns = [
    {
      key: "1",
      title: "Число",
      dataIndex: "numberValue",
    },
    {
      key: "2",
      title: "Имя",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Дата",
      dataIndex: "date",
    },
    {
      key: "5",
      title: "Действия",
      render: (row: Data) => {
        return (
          <>
            <EditOutlined />
            <DeleteOutlined
              onClick={() => {
                onDeleteRow(row);
              }}
              style={{ color: "red", marginLeft: 15 }}
            />
          </>
        );
      },
    },
  ];
  const [isAddRowModalOpen, setIsAddRowModalOpen] = useState(false);

  const handleAddRowModalOpen = () => setIsAddRowModalOpen(true);

  const onDeleteRow = (row: Data) => {
    dispatch(removeFromTable(row))
  };

  return (
    <>
      <Input></Input>
      <Button className={styles.button} onClick={handleAddRowModalOpen}>Добавить</Button>
      <Table columns={columns} dataSource={data} rowKey={(row) => row.id} />
      <AddModal isOpen={isAddRowModalOpen} setIsOpen={setIsAddRowModalOpen} />
    </>
  );
}