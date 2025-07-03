import type { Data } from "../interfaces/interfaces";

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  editingRow?: Data | null;
};

export type CreateRowType = Pick<Data, 'id' | 'numberValue' | 'name' | 'date'>;