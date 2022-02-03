import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import SuperForm from "../super-form/super-form";
import { SuperFormProps } from "../super-form/super-form.types";
import { LabelProps } from "../form-input/form-input.types";

describe("Super Form", () => {
  let case1: SuperFormProps;
  let case2: SuperFormProps;

  const header: LabelProps = {
    content: 'Super Form',
    bold: true,
    align: "left"
  }

  const initialValues = {
    username: 'test123'
  }

  const case1Fields: any[] = [
    [
      {
        type: 'text',
        name: 'username',
        id: 'username',
        value: '',
        label: 'Enter username',
        required: true
      },
      {
        type: 'password',
        name: 'password',
        id: 'password',
        value: '',
        label: { content: 'Enter password' },
        hint: "we will keep your username safe",
        required: true
      }],
    {
      type: 'number',
      name: 'age',
      id: 'age',
      value: 10,
      label: { content: 'Enter Age', align: 'left' },
      direction: "column",
      width: 100
    },
    {
      type: 'checkbox',
      name: 'override',
      id: 'override',
      checked: true,
      label: { content: 'Check the box', align: 'left', width: 100 },
      direction: 'row'
    },
    {
      type: 'select',
      name: 'selectname',
      id: 'select',
      value: 'female',
      label: { content: 'Select', align: 'left', width: 100 },
      options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }],
      width: 200
    }
  ]

  const case2Fields: any[] = [
    {
      type: 'text',
      name: 'username',
      id: 'username',
      value: '',
      label: 'Enter username',
      required: true
    }]

  beforeEach(() => {
    case1 = {
      fields: case1Fields,
      name: 'Super Form',
      header: header,
      onSubmitHandler: jest.fn(),
      initialValues: {username: 'test123'}
    };
    case2 = {
      fields: case2Fields,
      name: 'Super Form',
      header: header,
      classNames: 'custom-class',
      style: { borderWidth: 1 },
      onSubmitHandler: jest.fn(),
      initialValues: {username: 'test123'}
    };
  });

  const renderComponent = () => render(<SuperForm {...case1} />);

  const renderCustomComponent = () => render(<SuperForm {...case2} />);

  it("SuperForm should be rendered with props", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-super-form-wrapper-"+case1.name);
    expect(testComponent).toBeInTheDocument();
  });

  it("SuperForm should be rendered", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-super-form");
    expect(testComponent).toHaveClass("reusable-super-form");
  });

  it("SuperForm should have the Heading", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-super-form").firstChild;
    expect(testComponent).toHaveClass("reusable-super-form-heading");
  });

  it("SuperForm should rendered with the Heading text", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-super-form").firstChild;
    expect(testComponent).toHaveTextContent(header.content);
  });

  it("SuperForm should have form content wrapper", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-super-form").lastChild;
    expect(testComponent).toHaveClass('reusable-super-form-content');
  });

  it("SuperForm should render all the Fields", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-super-form-content").childNodes;
    expect(testComponent).toHaveLength(case1Fields.length)
  });

  it("SuperForm should render with intial value passed for username", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("form-input-group-username-input");
    expect(testComponent).toHaveValue(initialValues.username)
  });

  it("SuperForm should render with action panel", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-action-panel");
    expect(testComponent).toHaveClass("reusable-action-panel");
  });

  it("Action panel should have 2 buttons", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-action-panel").childNodes;
    expect(testComponent).toHaveLength(2)
  });

  it("Action panel should have first button as submit", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-action-panel").firstChild;
    expect(testComponent).toHaveAttribute("type", "submit");
  });

  it("Submit button should be disabled by default", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-action-panel").firstChild;
    expect(testComponent).toBeDisabled();
  });

  it("Action panel second button should be cancel", () => {
    const { getByTestId } = renderComponent();
    const testComponent = getByTestId("reusable-action-panel").lastChild;
    expect(testComponent).toHaveClass('reusable-button-action-cancel');
  });

  it("Submit button should be enabled after all the required fields are input", () => {
    const { getByTestId } = renderComponent();

    const passwordInput = getByTestId("form-input-group-password-input");
    userEvent.type(passwordInput, "testpassword");
    expect(passwordInput).toHaveValue("testpassword")
    const usernameInput = getByTestId("form-input-group-username-input");
    expect(usernameInput).toHaveValue("test123")
    const testComponent = getByTestId("reusable-button-action-primary");
    expect(testComponent).not.toHaveAttribute("disabled");
    userEvent.click(testComponent);
    expect(case1.onSubmitHandler).toHaveBeenCalledTimes(1);

  });

  it("SuperForm should be rendered with custom class name and style", () => {
    const { getByTestId } = renderCustomComponent();
    const testComponent = getByTestId("reusable-super-form");
    expect(testComponent).toHaveClass("custom-class");
    expect(testComponent).toHaveStyle("border-width: 1px");
  });

});
