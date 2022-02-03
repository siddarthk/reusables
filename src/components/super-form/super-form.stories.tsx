import React from "react"; import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SuperFormProps, SuperForm } from './super-form';


export default {
  title: "Components/SuperForm",
  Componnet: SuperForm,
} as ComponentMeta<typeof SuperForm>;

const Template: ComponentStory<typeof SuperForm> = (args: SuperFormProps) => <SuperForm {...args} />;

const fields: any[] = [
  [{
    type: 'email',
    name: 'username',
    id: 'username',
    value: '',
    label: 'Username',
    hint: "Username should be email",
    required: true
  },
  {
    type: 'password',
    name: 'password',
    id: 'password',
    value: '',
    label: { content: 'Password' },
    hint: "we will keep your password safe",
    required: true
  }],
  [{
    type: 'number',
    name: 'age',
    id: 'age',
    value: 10,
    label: { content: 'Age', align: 'left' },
    direction: "column",
  },
  {
    type: 'select',
    name: 'gender',
    id: 'gender',
    value: 'female',
    label: { content: 'Gender', align: 'left', width: 100 },
    options: [{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Maybe', value: 'maybe'}]
  }
  ],
  {
    type: 'file',
    name: 'uploadfile',
    value: '',
    label: { content: 'Select', align: 'left', width: 100 },
  },
  {
    type: 'checkbox',
    name: 'override',
    id: 'override',
    checked: true,
    label: { content: 'I Agree', align: 'left', width: 100 },
    direction: 'row'
  }
]

export const SimpleForm = Template.bind({});

SimpleForm.args = {
  fields: fields,
  header: { content: 'Simple Form', align: 'left'},
  name: 'simpleform',
  initialValues: {username: 'Test'}
};

