import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

import { SideModal as SideModalComponent } from '@concepta/react-material-ui';

// Button.displayName = "Button"

const meta = {
  component: SideModalComponent,
  parameters: { viewport: { defaultViewport: 'responsive' } },
  args: {
    open: false,
    textProps: {
      fontSize: 18,
      fontWeight: 500,
      color: 'common.white',
      fontFamily: "'Inter', sans-serif",
    },
    toggleDrawer: () => {},
  },
  argTypes: {
    title: { type: 'string' },
    textProps: {
      description: 'Text props for the title',
      control: { type: 'object' },
    },
    backgroundColor: { type: 'string', control: { type: 'color' } },
    headerBackgroundColor: { type: 'string', control: { type: 'color' } },
    closeIconColor: { type: 'string', control: { type: 'color' } },
    width: { type: 'number', control: { type: 'range', min: 100, max: 600 } },
    anchor: {
      options: ['right', 'left', 'top', 'bottom'],
      control: { type: 'select' },
    },
    sx: {
      description: 'Custom styles for the drawer',
      control: { type: 'object' },
    },
  },
  render: function SideModal(args) {
    const [{ open }, updateArgs] = useArgs();

    const toggleDrawer = () => {
      updateArgs({ open: !open });
    };

    return (
      <>
        <Button onClick={toggleDrawer} variant="contained">
          Open Modal
        </Button>
        <SideModalComponent {...args} open={open} toggleDrawer={toggleDrawer} />
      </>
    );
  },
} satisfies Meta<typeof SideModalComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    title: 'Side Menu',
    anchor: 'right',
    children: (
      <Box p={2}>
        <p>SideModal body</p>
      </Box>
    ),
  },
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
    backgroundColor: '#aaffff',
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
    width: 200,
  },
};

export const AnchorOptions: Story = {
  args: {
    title: 'Modal with Custom Anchor',
    anchor: 'left',
  },
};

/**
 * The SideModal width will adjust automatically to 100% on small screens.
 */
export const FullWidthOnSmallScreens: Story = {
  argTypes: {
    width: { control: { type: 'text' } },
  },
  args: {
    title: 'Full Width on Small Screens',
  },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
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
      opacity: 0.5,
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
