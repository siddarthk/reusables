import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import FormInput from "../form-input/form-input";
import { FormInputField, FormInputProps } from "../form-input/form-input.types";


describe("FormInput", () => {
  let case1: FormInputProps;
  let case2: FormInputProps;
  let case3: FormInputProps;

  const noLabelField: FormInputField =
  {
    type: 'text',
    name: 'username',
    value: 'dummy'
  }

  const simpleField: FormInputField =
  {
    type: 'text',
    name: 'username',
    value: 'dummy',
    label: 'Enter username',
    required: true
  }

  const complexField: FormInputField =
  {
    type: 'text',
    name: 'username',
    value: 'complexdummy',
    label: { content:'some label', align: 'right', width: 100},
    required: true,
    hint: 'some hint',
    width: 100,
    id: 'crypticeididi'
  }

  const emitChange = jest.fn();

  beforeEach(() => {
    case1 = {
      field: simpleField,
      emitChange: emitChange
    };
    case2 = {
      field: complexField,
      emitChange: emitChange
    };
    case3 = {
      field: noLabelField,
      emitChange: emitChange
    };
  });

  const renderComponentWithSimpleLabel = () => render(<FormInput {...case1} />);
  const renderComponentWithCustomLabel = () => render(<FormInput {...case2} />);
  const renderComponentWithNoLabel = () => render(<FormInput {...case3} />);

  it("FormInput with Simple Label and Input should be rendered", () => {
    const { getByTestId } = renderComponentWithSimpleLabel();
    const testComponent = getByTestId("form-input-group-username");
    expect(testComponent).toBeInTheDocument();
    expect(testComponent.childNodes).toHaveLength(2);
  });

  it("Simple Label should be rendered with 100% width", () => {
    const { getByTestId } = renderComponentWithSimpleLabel();
    const testComponent = getByTestId("form-input-group-username-label");
    expect(testComponent).toHaveTextContent(case1.field.label);
    expect(testComponent).toHaveStyle("width: 100%");
  });

  it("Input should be rendered with provided value and generated ID", () => {
    const { getByTestId } = renderComponentWithSimpleLabel();
    const testComponent = getByTestId("form-input-group-username-input");
    expect(testComponent).toBeInTheDocument();
    expect(testComponent).toHaveValue('dummy');
    expect(testComponent).toHaveAttribute('id',case1.field.name);
  });
 
  it("Complex Label should be rendered with right align and fixed width", () => {
    const { getByTestId } = renderComponentWithCustomLabel();
    const testComponent = getByTestId("form-input-group-username-label");
    expect(testComponent).toHaveTextContent(case2.field.label.content);
    expect(testComponent).toHaveStyle("text-align: right");
    expect(testComponent).toHaveStyle("width: 100px");
  });

  it("Complex Label with hint should be rendered", () => {
    const { getByTestId } = renderComponentWithCustomLabel();
    const testComponent = getByTestId("form-input-group-username").lastChild;
    expect(testComponent).toHaveTextContent('some hint');
  });

  it("Input should be rendered with fixed width and provided ID", () => {
    const { getByTestId } = renderComponentWithCustomLabel();
    const testComponent = getByTestId("form-input-group-username-input");
    expect(testComponent).toBeInTheDocument();
    expect(testComponent).toHaveValue('complexdummy');
    expect(testComponent).toHaveStyle("width: 100px");
    expect(testComponent).toHaveAttribute('id',case2.field.id);
  });

  it("FormInput without Label and only Input", () => {
    const { getByTestId } = renderComponentWithNoLabel();
    const testComponent = getByTestId("form-input-group-username").childNodes;
    expect(testComponent).toHaveLength(1)
  });

});
