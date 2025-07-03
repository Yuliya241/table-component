import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import styles from './TableComponent.module.css';
import { AddModal } from "../Add-modal/Add-modal";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../redux/selectors";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Data } from "../../interfaces/interfaces";
import type { AppDispatch } from "../../redux/store";
import { getData, removeFromTable } from "../../redux/slices";
import { EditModal } from "../Edit-modal/Edit-modal";

export const TableComponent = () => {
  const [isAddRowModalOpen, setIsAddRowModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Data | null>(null);
  const data = useSelector(selectItems());
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) {
      dispatch(getData(data));
    }
  }, [data]);

  const handleAddRowModalOpen = () => setIsAddRowModalOpen(true);

  const onDeleteRow = (row: Data) => {
    dispatch(removeFromTable(row))
  };

  const onEditRow = (row: Data) => {
    setIsEditing(true);
    setEditingRow(row);
  };

  return (
    <>
      <Button
        className={styles.button}
        type="primary"
        onClick={handleAddRowModalOpen}
      >
        Добавить
      </Button>
      <Table
        columns={[
          {
            title: "Число",
            dataIndex: "numberValue",
            sorter: (a: Data, b: Data) => {
              return a.numberValue - b.numberValue
            }
          },
          {
            title: "Имя",
            dataIndex: "name",
            sorter: (a: Data, b: Data) => a.name.localeCompare(b.name)
          },
          {
            title: "Дата",
            dataIndex: "date",
            sorter: (a: Data, b: Data) => new Date(a.date).getTime() - new Date(b.date).getTime()
          },
          {
            title: "Действия",
            render: (row: Data) => {
              return (
                <>
                  <EditOutlined
                    style={{ fontSize: "1.1rem" }}
                    onClick={() => {
                      onEditRow(row);
                    }}
                  />
                  <DeleteOutlined
                    onClick={() => {
                      onDeleteRow(row);
                    }}
                    style={{ color: "red", marginLeft: 15, fontSize: "1.1rem" }}
                  />
                </>
              );
            },
          },
        ]}
        dataSource={data}
        rowKey={(row) => row.id}
        rowClassName={styles.row}
        pagination={false}
      />
      <AddModal isOpen={isAddRowModalOpen} setIsOpen={setIsAddRowModalOpen} />
      {isEditing && <EditModal isOpen={isEditing} setIsOpen={setIsEditing} editingRow={editingRow} />}
    </>
  );
}
