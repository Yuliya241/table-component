import { Form, Input, Modal, Button } from "antd";
import type { ModalProps } from "../../types/types";
import type { Data } from "../../interfaces/interfaces";
import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { editData } from "../../redux/slices";
import styles  from './Edit-modal.module.css'
import { INITIAL_FORM_DATA } from "../../constants/constants";

export const EditModal = ({ isOpen, setIsOpen, editingRow }: ModalProps) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Data>(editingRow || INITIAL_FORM_DATA);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value: rawValue } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: rawValue
    }));
  };

  const handleSubmit = () => {
    setIsOpen(false);
    dispatch(editData(formData));
    form.resetFields();
  };

  const handleChange = () => {
    form
      .validateFields()
      .then(() => {
        handleSubmit();
      })
      .catch((info) => {
        console.log("Валидация не пройдена:", info);
      });
  }

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields()
  };

  return (
    <Modal
      title="Редактирование строки"
      open={isOpen}
      okText="Изменить"
      cancelText="Отмена"
      onCancel={handleCancel}
      className={styles.modal}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleChange}
        >
          Изменить
        </Button>
      ]}
    >
      <Form
        layout="vertical"
        className={styles.form}
        autoComplete="off"
        form={form}
        initialValues={editingRow ? editingRow : INITIAL_FORM_DATA}
      >
        <Form.Item
          name="numberValue"
          label="Число"
          rules={[
            {
              required: true,
              message: "Введите число",
              pattern: new RegExp(/^[0-9]+$/)
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input onChange={handleInputChange}
            id="numberValue"
            name="numberValue"
            placeholder="Введите число"
            value={formData?.numberValue}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Имя"
          rules={[
            {
              required: true,
              message: "Введите имя",
            },
            { whitespace: true },
          ]}
          hasFeedback
        >
          <Input onChange={handleInputChange}
            id="name"
            name="name"
            placeholder="Введите имя"
            value={formData?.name}
          />
        </Form.Item>
        <Form.Item
          name="date"
          label="Дата"
          rules={[
            {
              required: true,
              message: "Выберите дату",
            },
          ]}
          hasFeedback
        >
          <Input onChange={handleInputChange}
            id="date"
            name="date"
            style={{ width: "100%" }}
            type="date"
            value={formData?.date}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}