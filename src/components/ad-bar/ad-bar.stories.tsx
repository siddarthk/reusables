import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AdBar, AdBarProps} from './ad-bar';

export default {
  title: 'Components/AdBar',
  component: AdBar,
  argTypes: {
  },
} as ComponentMeta<typeof AdBar>;

const Template: ComponentStory<typeof AdBar> = (args:AdBarProps) => <AdBar {...args} />;

export const Sticky = Template.bind({});
Sticky.args = {
  message: "Avail early bird discount for first 250 orders"
};


export const Closable = Template.bind({});
Closable.args = {
  message: "Avail early bird discount for first 250 orders",
  canClose: true
};
