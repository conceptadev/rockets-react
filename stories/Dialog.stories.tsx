import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Dialog, Image } from '@concepta/react-material-ui';

const meta = {
  component: Dialog,
  parameters: { viewport: { defaultViewport: 'responsive' } },
  args: {
    open: false,
    handleClose: () => {},
  },
  argTypes: {
    open: { type: 'boolean' },
    handleClose: { type: 'function' },
    title: { type: 'string' },
    children: {
      description: 'React node to render in the body',
      control: 'object',
    },
    footer: {
      description: 'React node to render in the footer',
      control: 'object',
    },
    dividers: {
      type: 'boolean',
      description:
        'If true, the dialog will have dividers after the title and the body',
      control: 'boolean',
    },
  },
  render: function SideModal(args) {
    const [{ open }, updateArgs] = useArgs();

    const toggleDialog = () => {
      updateArgs({ open: !open });
    };

    return (
      <>
        <Button onClick={toggleDialog} variant="contained">
          Open Dialog
        </Button>
        <Dialog {...args} open={open} handleClose={toggleDialog} />
      </>
    );
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    title: 'Dialog Title',
    children: <Box>Dialog Content</Box>,
    footer: <Box>Dialog Footer</Box>,
  },
};

export const Title: Story = {
  args: {
    title: 'Dialog Title',
    PaperProps: { sx: { minWidth: 200, width: 200 } },
  },
};

export const Children: Story = {
  args: {
    title: 'Dialog Title',
    children: (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Box>
        <Box>
          <Image src="https://picsum.photos/200/200" />
        </Box>
      </Box>
    ),
  },
};
export const TextChildren: Story = {
  args: {
    title: 'Dialog Title',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};

export const Footer: Story = {
  args: {
    title: 'Dialog Title',
    footer: <Box>Dialog Footer</Box>,
    PaperProps: { sx: { minWidth: 200, width: 200 } },
  },
};

export const Dividers: Story = {
  args: {
    title: 'Dialog Title',
    children: <Box>Dialog Content</Box>,
    footer: <Box>Dialog Footer</Box>,
    dividers: true,
  },
};
