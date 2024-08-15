import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormLabel } from '@concepta/react-material-ui';

/**
 * The FormLabel is mainly used internally to display a label for a form field.
 * But you can use it to compose your own form fields as well.
 */
const meta = {
  component: FormLabel,
  tags: ['autodocs'],
  args: {
    label: 'Field Label',
  },
  argTypes: {},
  render: (args) => (
    <>
      <FormLabel {...args} />
      <input id="formField" />
    </>
  ),
} satisfies Meta<typeof FormLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomTextStyles: Story = {
  args: {
    labelProps: {
      color: 'text.secondary',
      fontSize: 18,
      fontFamily: 'Times New Roman',
      fontWeight: 700,
    },
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
  },
};

/**
 * The `name` prop is used to associate the label with the form field.
 * It is passed to the `htmlFor` attribute of the label. This way, screen
 * readers will read the label when the form field is focused.
 */
export const FormLabelWithIdAndName: Story = {
  args: {
    id: 'formFieldLabelId',
    name: 'formField',
    label: 'Field Label',
  },
};
