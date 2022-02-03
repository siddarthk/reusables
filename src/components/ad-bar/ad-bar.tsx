import React from 'react';
import styled, { css } from 'styled-components';
import { Close } from '../action-icon/icon';
import ActionIcon from '../action-icon/action-icon';
import { useToggle } from '../../hooks/';

export interface AdBarProps {
  /**
   * Text that will be displayed in the AdBar
   */
  message: string
  /**
   * Can user close the AdBar?
   */
  canClose?: boolean
};

const Wrappper = styled.div`
  display: grid;
  border: 1px solid #ccc;
  grid-template-columns: auto auto;
  justify-items: flex-end;
  padding-right: 10px;
  padding-top: 10px;
  height: 2rem;
`;

export const AdBar = (props: AdBarProps) => {
  const { message, canClose = false } = props;
  const { value, toggle } = useToggle(false);

  return (
    <Wrappper data-testid="reusable-ad-bar" className='' style={{display: value ? 'none' : 'grid'}}>
      <div>{message}</div>
      {canClose && <ActionIcon icon={Close} onClick={toggle} />}
    </Wrappper>
  )
}

export default AdBar;