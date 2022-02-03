import React from "react"; import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormInput } from './form-input';
import { FormInputProps } from './form-input.types';


export default {
  title: "Components/FormInput",
  Componnet: FormInput,
  parameters: {
    docs: {
      description: {
        component: `Simple Label and Input wrapped together`
      }
    }
  }
} as ComponentMeta<typeof FormInput>;

const Template: ComponentStory<typeof FormInput> = (args: FormInputProps) => <FormInput {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
  field: {
    type: 'text',
    name: 'username',
    value: '',
    label: 'Username'
  }
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  field: {
    type: 'number',
    name: 'age',
    value: '',
    label: 'Age'
  }
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  field: {
    type: 'password',
    name: 'secret',
    value: '',
    label: 'Password'
  }
};

export const CheckBox = Template.bind({});
CheckBox.args = {
  field: {
    type: 'checkbox',
    name: 'checkbox',
    value: '',
    label: {content: 'Check the box', align: 'left', width: 100},
  }
};

export const Select = Template.bind({});
Select.args = {
  field: {
    type: 'select',
    name: 'select',
    value: '',
    label: 'Selct',
    options: [{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Maybe', value: 'maybe'}]
  }
};
