import type { Data } from "../interfaces/interfaces";

export type AddModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export type CreateRowType = Pick<Data, 'id' | 'numberValue' | 'name' | 'date'>;