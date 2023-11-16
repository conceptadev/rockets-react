/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dialog from '../src/components/Dialog/Dialog';

describe('Dialog Component', () => {
  const props = {
    handleClose: jest.fn(),
  };

  it('should render correctly', () => {
    render(<Dialog open={true} {...props} />);
  });

  it('renders title correctly', () => {
    const { getByText } = render(
      <Dialog open={true} {...props} title="Test Title" />,
    );
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Dialog open={true} {...props} title="Test Title">
        <div>Test Children</div>
      </Dialog>,
    );
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('renders footer correctly', () => {
    const { getByText } = render(
      <Dialog
        open={true}
        {...props}
        title="Test Title"
        footer={<div>Test Footer</div>}
      >
        <div>Test Children</div>
      </Dialog>,
    );
    expect(getByText('Test Footer')).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', () => {
    const { getByLabelText } = render(
      <Dialog open={true} {...props} title="Test Title" />,
    );
    fireEvent.click(getByLabelText('close'));
    expect(props.handleClose).toHaveBeenCalledTimes(1);
  });

  test('checks if it is not rendered if "open" is set to false', () => {
    const { queryByText } = render(
      <Dialog open={false} {...props} title="Test Title" />,
    );
    expect(queryByText('Test Title')).not.toBeInTheDocument();
  });
});
