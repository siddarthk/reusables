import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import AdBar, {AdBarProps} from "../ad-bar/ad-bar";

describe('AdBar', () => {

  let props1: AdBarProps;
  let props2: AdBarProps;

  const onClick = jest.fn();

  beforeEach(() => {
    props1 = {
      message:'test message'
    };
    props2 = {
      message: 'test message',
      canClose: true
    };
  });

  const renderComponentSticky = (props:AdBarProps) => render(<AdBar {...props} />);

  it("AdBar should render as sticky", () => {
    const { getByTestId } = renderComponentSticky(props1);
    const testComponent = getByTestId("reusable-ad-bar");
    expect(testComponent.firstChild).toHaveTextContent('test message');
    expect(testComponent.childNodes).toHaveLength(1);
  });

  it("AdBar should render as closable", () => {
    const { getByTestId } = renderComponentSticky(props2);
    const testComponent = getByTestId("reusable-ad-bar");
    expect(testComponent).toBeInTheDocument();
    expect(testComponent.firstChild).toHaveTextContent('test message');
    expect(testComponent.childNodes).toHaveLength(2);
  });
  
});
