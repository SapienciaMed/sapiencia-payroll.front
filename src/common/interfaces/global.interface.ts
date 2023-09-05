import { EResponseCodes } from "../constants/api.enum";

export interface IMessage {
  type?: EResponseCodes;
  show?: boolean;
  title?: string;
  description?: string | React.JSX.Element;
  onClickOutClose?: boolean;
  background?: boolean;
  size?: string;
  style?: string;
  OkTitle?: string;
  cancelTitle?: string;
  OkButtonStyle?: string;
  cancelButtonStyle?: string;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}
export interface IGenericList {
  id: number;
  grouper: string;
  itemCode: string;
  itemDescription: string;
  additionalFields?: object
}

export interface IAdditionalField {
  grouper: string;
  parentItemCode: string;
  fieldName?: string;
}

