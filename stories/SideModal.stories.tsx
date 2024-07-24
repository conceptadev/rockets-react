import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box, Button } from '@mui/material';

import { SideModal } from '@concepta/react-material-ui';

const meta = {
  component: SideModal,
  tags: ['autodocs'],
  args: {
    open: false,
    toggleDrawer: fn(),
  },
  argTypes: {
    anchor: {
      control: {
        type: 'select',
        options: ['left', 'right', 'top', 'bottom'],
      },
    },
  },
} satisfies Meta<typeof SideModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomHeaderBackgroundColor: Story = {
  args: {
    title: 'Header with Custom Background Color',
    headerBackgroundColor: '#3f51b5',
  },
};

export const CustomBackgroundColor: Story = {
  args: {
    title: 'Modal with Custom Background Color',
    backgroundColor: '#00ff00',
  },
};

export const CustomCloseIconColor: Story = {
  args: {
    title: 'Modal with Custom Close Icon Color',
    closeIconColor: '#ff0000',
  },
};

export const CustomWidth: Story = {
  args: {
    title: 'Modal with Custom Width',
    width: '200px',
  },
};

export const AnchorOptions: Story = {
  args: {
    title: 'Modal with Custom Anchor',
    anchor: 'left',
  },
};

export const FullWidthOnSmallScreens: Story = {
  args: {
    title: 'Full Width on Small Screens',
    width: '100%',
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
};

export const Children: Story = {
  args: {
    title: 'Modal with Children',
    children: <Box p={2}>This is the modal content!</Box>,
  },
};

export const CustomStylesWithSx: Story = {
  args: {
    title: 'Modal with Custom Styles',
    sx: {
      '& .MuiDrawer-paper': {
        border: '5px solid red',
      },
    },
  },
};

export const WithTextPropsCustomization: Story = {
  args: {
    title: 'Modal with Custom Text Props',
    textProps: {
      fontSize: 24,
      fontWeight: 700,
      color: 'secondary.main',
    },
  },
};
