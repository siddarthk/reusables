import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ActionIcon, ActionIconProps } from './action-icon';
import { Close } from '../action-icon/icon';

export default {
  title: 'Components/ActionIcon',
  component: ActionIcon,
  argTypes: {
  },
} as ComponentMeta<typeof ActionIcon>;

const Template: ComponentStory<typeof ActionIcon> = (args:ActionIconProps) => <ActionIcon {...args} />;

export const Default = Template.bind({});

Default.args = {
  icon: Close
};
