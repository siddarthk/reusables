import React from 'react'
import styled, { css } from 'styled-components'

export interface IMenuItem {
  label: string,
  description?: string,
  path: string,
  icon?: string,
  iconAlign?: 'left' | 'right',
  active?: boolean
}

export interface IMenu {
  items: Array<IMenuItem>,
  mode?: 'single' | 'multi',
  component?: any
}

interface IWrapper {
  mode: string;
}

interface ILink {
  href?: string,
  to?: string
}

const Wrapper = styled.div<IWrapper>`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding-right: 10px;
  line-height: 2rem;
  width: 160px;
  border-left: ${props => props.mode === 'multi' ? '1px solid #e8e8e8' : 'none'};
`;

const Link = styled.div<ILink>`
  text-decoration: none;
  color: #454545;
  &.active {
    color: #3b5fc0
  }
`;

const MultiLink = styled.div<ILink>`
  text-decoration: none;
  color: #454545;
  padding-left: 1rem;
  margin-bottom:2rem;
  line-height: 1rem;
  &.active {
    color: #3b5fc0;
    border-left: 2px solid #3b5fc0;
  }
`;

const MultiLinkLabel = styled.div`
  text-decoration: none;
`;

const MultiLinkDescription = styled.div`
  text-decoration: none;
  color: #6e6e6e;
  font-size: .8rem;
`;

const renderSingleItem = (component: any, item: IMenuItem) => {
  return <Link href={item.path} as={component}>{item.label}</Link>
}

const renderMultiItem = (component: any, item: IMenuItem) => {
  return <MultiLink href={item.path} as={component}>
    <MultiLinkLabel>{item.label}</MultiLinkLabel>
    <MultiLinkDescription>{item.description}</MultiLinkDescription>
  </MultiLink>
}

export const VMenu = ({
  items,
  mode = 'single',
  component = 'a'
}: IMenu
) => {
  return (
    <div>
      <Wrapper className='vmenu' mode={mode}>
        {items.map(item => mode === 'multi' ? 
          renderMultiItem(component, item) : 
          renderSingleItem(component, item))
        }
      </Wrapper>
    </div>
  )
}

export default VMenu;