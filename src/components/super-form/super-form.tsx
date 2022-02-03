import React, { useState, useEffect } from "react";
import FormInput from "../form-input/form-input";
import styled from 'styled-components';
import "./super-form.scss";
import { KeyInputProps, MouseInputProps, CheckboxProps, NumberInputProps, LabelProps, FormInputField } from '../form-input/form-input.types';

export interface SuperFormProps {
  /**
   * Fields Shape
   */
  fields: Array<FormInputField>
  /**
   * Name of the form
   */
  name: string,
  /**
   * Header Object
   */
  header: LabelProps,
  /**
   * ClassName
   */
  classNames?: string,
  /**
   * Style
   */
  style?: {},
  /**
   * Form Initial Values
   */
  initialValues? : any
  /**
   * Onsubmit Handler
   */
  onSubmitHandler: Function
}

interface IGroup {
  size: number
}

const Group = styled.div<IGroup>`
  display: grid;
  grid-template-columns: ${props => Array.from(Array(props.size).keys()).map(item => '1fr').join(' ')};
  grid-gap: 10px;
`;

export const SuperForm = ({ 
  fields, 
  name, 
  header, 
  initialValues = {}, 
  classNames = undefined, 
  style = undefined, 
  onSubmitHandler }: SuperFormProps) => {

  const [form, setFormData] = useState<any>({});
  const [requiredFields, setRequiredFields] = useState<Array<string>>([]);
  const [isFormValid, setFormStatus] = useState(false);

  const renderField = (param: FormInputField) => {
    if (initialValues && initialValues.hasOwnProperty(param.name)) {
      param.value = initialValues[param.name];
    }
    return <FormInput field={param} emitChange={emitChangeHandler} key={param.name} />
  }

  const groupIfRequired = (field: FormInputField, index: number) => {
    if (Array.isArray(field)) {
      const size = field.length;
      return <Group size={size} key={`form-group-${index}`}>
        {field.map((item) => renderField(item))}
      </Group>
    } else {
      return renderField(field);
    }
  }

  const emitChangeHandler = (obj: Object) => {
    const nform = { ...form, ...obj };
    setFormData(nform);
  }

  const internalFormSubmitHandler = (e: any) => {
    e.preventDefault();
    onSubmitHandler(form);
    return false;
  }

  useEffect(() => {
    let flag = requiredFields.length === 0 ? false : true;
    requiredFields.forEach(item => {
      if (!form[item]) {
        flag = false;
      }
    });
    setFormStatus(flag);
  }, [form])

  useEffect(() => {
    fields.forEach(field => emitChangeHandler({ [field.name]: field.value }));
    const effectiveFields: Array<FormInputField> = [].concat.apply([], fields as []);
    let requiredFields: Array<string> = [];
    requiredFields.push(...effectiveFields.map(item => item.required ? item.name : 'undefined').filter(item => item !== 'undefined'));
    setRequiredFields(requiredFields);
    setFormData(initialValues);
  }, []);

  return (
    <div data-testid={`reusable-super-form-wrapper-${name}`}>
      <form onSubmit={internalFormSubmitHandler}>
        <div data-testid="reusable-super-form" className={classNames ? classNames : 'reusable-super-form'} style={style}>
          <div className='reusable-super-form-heading'>{header.content}</div>
          <div className='reusable-super-form-content' data-testid="reusable-super-form-content" >
            {fields.map((field, index) => groupIfRequired(field, index))}
          </div>
        </div>
        <div className='reusable-action-panel' data-testid="reusable-action-panel">
          <button data-testid="reusable-button-action-primary" className='reusable-button reusable-button-action-primary' type='submit' disabled={!isFormValid}>Submit</button>
          <button data-testid="reusable-button-action-cancel" className='reusable-button reusable-button-action-cancel'>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default SuperForm;

