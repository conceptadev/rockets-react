/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Dialog } from '../src/components/Dialog/Dialog';

describe('Dialog Component', () => {
  const props = {
    handleClose: jest.fn(),
  };

  it('should render correctly', () => {
    render(<Dialog open={true} {...props} />);
  });

  it('renders title string correctly', () => {
    const { getByText } = render(
      <Dialog open={true} {...props} title="Test Title" />,
    );
    const title = getByText('Test Title');
    expect(title).toBeInTheDocument();
  });

  it('renders title element correctly', () => {
    const { getByText } = render(
      <Dialog open={true} {...props} title={<div>Test Title</div>} />,
    );
    const title = getByText('Test Title');
    expect(title).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Dialog open={true} {...props} title="Test Title">
        <div>Test Children</div>
      </Dialog>,
    );
    const children = getByText('Test Children');
    expect(children).toBeInTheDocument();
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
    const footer = getByText('Test Footer');
    expect(footer).toBeInTheDocument();
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
    const title = queryByText('Test Title');
    expect(title).not.toBeInTheDocument();
  });
});
