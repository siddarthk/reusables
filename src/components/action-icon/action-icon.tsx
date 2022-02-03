import React, { FC } from 'react'

export interface ActionIconProps {
  /**
   * Width of the Icon?
   */
  width?: number,
  /**
   * Height of the Icon? 
   */
  height?: number,
  /**
   * Custom style?
   */
  style?: {},
  /**
   * Icon content
   */
  icon: any,
  /**
   * Click Handler?
   */
  onClick?: Function
}

export const ActionIcon = ({
  width = 25,
  height = 25,
  style = {},
  icon,
  onClick
}: ActionIconProps) => {
  return (
    <div data-testid='reusable-action-icon' style={{ cursor: 'pointer', width: width, height: height, ...style }} onClick={
      (event) => onClick ? onClick() : event.preventDefault()}>
      {icon}
    </div>
  )
}

export default ActionIcon;