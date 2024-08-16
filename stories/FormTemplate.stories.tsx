import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  FormTemplate,
  SimpleForm,
  TextField,
} from '@concepta/react-material-ui';
import rockets from './assets/rockets.svg';

const meta = {
  component: FormTemplate,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    subtitle: {
      control: { type: 'text' },
    },
  },
  render: (args) => (
    <FormTemplate {...args}>
      {args.children ? (
        args.children
      ) : (
        <SimpleForm
          form={{
            fields: {
              name: {
                type: 'string',
                title: 'Name',
              },
              email: {
                type: 'email',
                title: 'Email',
              },
            },
          }}
        />
      )}
    </FormTemplate>
  ),
} satisfies Meta<typeof FormTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <img src={rockets} alt="rockets" width={60} height={60} />,
    title: 'User Form',
    subtitle: "Please enter user's details",
  },
};

export const WithTitleAndSubtitle: Story = {
  args: {
    title: 'Form Title',
    subtitle: 'Form Subtitle',
  },
};

export const WithIcon: Story = {
  args: {
    subtitle: 'Form Template With Icon',
    icon: <img src={rockets} alt="rockets" width={60} height={60} />,
  },
};

export const CustomStyledTitleAndSubtitle: Story = {
  args: {
    title: 'Custom Styled Title',
    subtitle: 'Custom Styled Subtitle',
    titleTextProps: {
      color: 'primary.main',
      variant: 'h4',
      gutterBottom: true,
    },
    subtitleTextProps: {
      color: 'secondary.main',
      variant: 'subtitle1',
    },
  },
};

export const CustomContainerStyles: Story = {
  args: {
    title: 'Custom Container',
    subtitle: 'This container has custom styles',
    containerProps: {
      sx: {
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        padding: '40px',
      },
    },
  },
};

export const CustomCardStyles: Story = {
  args: {
    title: 'Custom Card',
    subtitle: 'This card has custom styles',
    cardProps: {
      sx: {
        backgroundColor: '#ffe9e9',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      },
    },
  },
};

export const WithChildrenComponents: Story = {
  args: {
    title: 'Login',
    children: (
      <>
        <TextField name="email" label="Email" type="email" />
        <TextField name="password" label="Password" type="password" />
      </>
    ),
  },
};
