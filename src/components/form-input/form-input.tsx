import React, { BaseSyntheticEvent, useEffect } from "react";
import { FormInputProps } from "./form-input.types";
import styled, { css } from 'styled-components';

interface ICustom {
  width?: number,
  height?: number,
  direction?: string,
  align?: string
}

const Group = styled.div<ICustom>`
  display: flex;
  flex-direction : ${props => props.direction};
  padding: .5rem;
`;

const DefaultLabel = styled.label<ICustom>`
  width: ${props => calcWidth(props.direction).label + '%'};
`;

const CustomLabel = styled(DefaultLabel)`
  width: ${props => props.width ? props.width + 'px' : calcWidth(props.direction).label + '%'};
  text-align: ${props => props.align || 'left'};
`;

const Input = styled.input<ICustom>`
  ${props => props.width && css`
    width: ${props.width}px;
  `}
`;

const Select = styled.select<ICustom>`
  ${props => props.width && css`
    width: ${props.width}px;
  `}
`;

const Hint = styled.small`
`;

const calcWidth = (d:string | undefined) => {
  return d === 'column' ? { label: 100, input: 0 } : { label: 50, input: 100 }
}

export const FormInput = (props: FormInputProps) => {
  const { id, label, direction = 'column', width, hint, ...field } = props.field;
  const { emitChange } = props;
  const [value, setValue] = React.useState('');
  const fieldId = id ? id : field.name;

  const derivedProps = Object.assign({}, field, { value: value });

  const onChangeHandler = (event: BaseSyntheticEvent) => {
    const value = field.type === 'file' ? event.target.files[0] : event.target.value;
    setValue(event.target.value);
    if (emitChange) {
      emitChange({ [field.name]: value });
    }
  }
  const hasLabel = label ? true : false;
  const isSimpleLabel = typeof label === 'string' ? true : false

  const renderInput = () => {
    if (field.type === 'select') {
      return <Select {...derivedProps} onChange={onChangeHandler} data-testid={`form-input-group-${derivedProps.name}-select`} value={value} width={width} direction={direction} id={fieldId}>
        {field.options && field.options.map(item => <option value={item.value} key={`${field.name}-${item.label}`}>{item.label}</option>)}
      </Select>
    } else {
      return <Input {...derivedProps} onChange={onChangeHandler} data-testid={`form-input-group-${derivedProps.name}-input`} value={value} width={width} direction={direction} id={fieldId} />
    }
  }

  useEffect(() => {
    setValue(field.value);
  }, []);

  return (
    <Group direction={direction} data-testid={`form-input-group-${field.name}`}>
      { hasLabel && isSimpleLabel && <DefaultLabel direction={direction} htmlFor={field.name} data-testid={`form-input-group-${field.name}-label`}>{label}</DefaultLabel>}
      { hasLabel && !isSimpleLabel && <CustomLabel direction={direction} htmlFor={field.name} width={label.width} height={label.height} align={label.align} data-testid={`form-input-group-${field.name}-label`}>{label.content}</CustomLabel>}
      {renderInput()}
      {hint && <Hint>{hint}</Hint>}
    </Group>
  );
};

export default FormInput;

