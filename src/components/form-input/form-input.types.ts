enum KeyInputEnums {
  "text" , "password" , "email" , "hidden" , "number" , "search" , "tel" , "url" , "week"
}

enum MouseInputEnums {
  "button" , "checkbox" , "color" , "date" , "datetime-local" , "file" , "image" , "month" , "radio" , "range" , "reset" , "search" , "submit" , "time" , "url" , "week", "select"
}

export interface KeyInputProps {
  name: string;
  id?: string;
  readOnly?: boolean;
  autocomplete?: boolean;
  autofocus?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  list?: any;
  placeholder?: string;
  required?: boolean;
}

export interface MouseInputProps {
  autofocus?: true | false;
  defaultValue?: string;
  disabled?: true | false;
  id?: string;
  name: string;
  value: string;
}

export interface CheckboxProps extends MouseInputProps {
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
}

export interface TextInputProps extends KeyInputProps {
  maxLength?: number;
  pattern?: string;
  size?: number;
  value: string;
}

export interface NumberInputProps extends KeyInputProps {
  step?: number;
}

export interface LabelProps {
  /**
   * The text to be shown as label
   */
  content: string;
  /**
   * Alignment of the label text 
   */
  align: 'left' | 'right' | 'center';
  /**
   * Should the label be bold
   */
  bold: boolean,
  /**
   * Width of the label
   */
  width?: number
}

type KeyInputTypes = keyof typeof KeyInputEnums;
type MouseInputTypes = keyof typeof MouseInputEnums;

export interface OptionProps {
  label: string;
  value: string | number;
}


export interface FormInputField extends TextInputProps , NumberInputProps , CheckboxProps {
  /**
   * type
   */
  type : KeyInputTypes | MouseInputTypes 
  /**
   * label
   */
  label?: any | LabelProps;
  /**
   * Direction of the field 
   */
  direction? : 'column' | 'row';
  /**
   * Width 
   */
  width? : number,
  /**
   * Hint text for the field
   */
  hint?: string | undefined,
  /**
   * Options for Select Field
   */
  options?: Array<OptionProps>
}

export interface FormInputProps {
  /**
   * Form Input Field
   */
  field: FormInputField,
  /**
   * change handler
   */
  emitChange?: Function
}
