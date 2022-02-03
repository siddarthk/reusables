import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import ActionIcon, { ActionIconProps } from "../action-icon/action-icon";
import { Close } from "../action-icon/icon";

describe('ActionIcon', () => {

  let props1: ActionIconProps;
  let props2: ActionIconProps;

  const onClick = jest.fn();

  beforeEach(() => {
    props1 = {
      icon: Close
    };
    props2 = {
      icon: Close,
      width: 30,
      height: 30
    };
  });


  const renderComponentWithDefaultWidthAndHeight= () => render(<ActionIcon {...props1 }/>);

  const renderComponentWithCustomWidthAndHeight = () => render(<ActionIcon {...props2}/>);

  it("ActionIcon should render", () => {
    const { getByTestId } = renderComponentWithDefaultWidthAndHeight();
    const testComponent = getByTestId("reusable-action-icon");
    expect(testComponent).toBeInTheDocument();
  });

  it("ActionIcon should render with default width and height", () => {
    const { getByTestId } = renderComponentWithDefaultWidthAndHeight();
    const testComponent = getByTestId("reusable-action-icon");
    expect(testComponent).toHaveStyle("width: 25px; height: 25px");
  });

  it("ActionIcon should render with custom width and height", () => {
    const { getByTestId } = renderComponentWithCustomWidthAndHeight();
    const testComponent = getByTestId("reusable-action-icon");
    expect(testComponent).toHaveStyle("width: 30px; height: 30px");
  });

  it("ActionIcon should be clickable", () => {
    const { getByTestId } = renderComponentWithCustomWidthAndHeight();
    const testComponent = getByTestId("reusable-action-icon");
    userEvent.click(testComponent);
  });

});
