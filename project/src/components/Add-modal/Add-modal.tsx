import { Modal } from "antd";
import type { AddModalProps, CreateRowType } from "../../types/types";
import type { Data } from "../../interfaces/interfaces";
import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { addToTable } from "../../redux/slices";

export const AddModal = ({ isOpen, setIsOpen }: AddModalProps) => {
  const INITIAL_FORM_DATA: CreateRowType = {
    id: Date.now(),
    numberValue: 0,
    name: '',
    date: ''
  };

  const [formData, setFormData] = useState<CreateRowType>(INITIAL_FORM_DATA);
  const [tableItems, setTableItems] = useState<Data[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value: rawValue } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: rawValue
    }));
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setTableItems((pre: Data[]) => {
      return [...pre, formData];
    });
    dispatch(addToTable(formData));
    setFormData(INITIAL_FORM_DATA);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title="Добавление строки"
      open={isOpen}
      onOk={handleConfirm}
      onCancel={handleCancel}
    >
      <form>
        <input onChange={handleInputChange}
          id="numberValue"
          name="numberValue"
          value={formData?.numberValue ?? ''}></input>
        <input onChange={handleInputChange}
          id="name"
          name="name"
          value={formData?.name}></input>
        <input onChange={handleInputChange}
          id="date"
          name="date"
          value={formData?.date}></input>
      </form>
    </Modal>
  );
}