import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VMenu, IMenu, IMenuItem } from './v-menu';
import { Close } from '../action-icon/icon';

export default {
  title: 'Components/VMenu',
  component: VMenu,
  argTypes: {
  },
} as ComponentMeta<typeof VMenu>;

const Template: ComponentStory<typeof VMenu> = (args:IMenu) => <VMenu {...args} />;
const items = [
  {label: 'Home', path: 'home', description: 'Click here to navigate to Home screen'},
  {label: 'Profile', path: 'profile', description: 'Click here to navigate to Profile screen'}
]
export const VMenuSingle = Template.bind({});
VMenuSingle.args = {
  items: items
};

export const VMultiMenu = Template.bind({});
VMultiMenu.args = {
  items: items,
  mode: 'multi'
};
