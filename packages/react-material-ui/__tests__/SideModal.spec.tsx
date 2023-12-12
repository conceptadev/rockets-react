/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SideModal, {
  SideModalProps,
} from '../src/components/SideModal/SideModal';

describe('SideModal', () => {
  const defaultProps: SideModalProps = {
    open: true,
    title: 'Test Title',
    toggleDrawer: jest.fn(),
    textProps: {
      fontSize: 18,
      fontWeight: 500,
      color: 'rgb(255, 0, 0)',
      fontFamily: "'Inter',sans-serif",
    },
    backgroundColor: 'yellow',
    headerBackgroundColor: 'blue',
    closeIconColor: 'green',
    width: '22%',
    anchor: 'left',
    sx: { marginTop: '20px' },
    children: <div>Test Children</div>,
  };

  it('renders without crashing', () => {
    render(<SideModal {...defaultProps} />);
  });

  it('renders title correctly', () => {
    const { getByText } = render(<SideModal {...defaultProps} />);
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText } = render(<SideModal {...defaultProps} />);
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('closes the drawer if close button is pressed', () => {
    const toggleDrawer = jest.fn();

    const { getByTestId } = render(
      <SideModal {...defaultProps} toggleDrawer={toggleDrawer} />,
    );
    const closeButton = getByTestId('side-modal-close-button');

    fireEvent.click(closeButton);
    expect(toggleDrawer).toHaveBeenCalledTimes(1);
  });

  test('opens and closes the drawer', () => {
    const toggleDrawer = jest.fn();

    const { getByTestId, queryByTestId, rerender } = render(
      <SideModal {...defaultProps} open={false} />,
    );

    const sideModalClosed = queryByTestId('side-modal');
    expect(sideModalClosed).not.toBeInTheDocument();

    rerender(
      <SideModal {...defaultProps} open={true} toggleDrawer={toggleDrawer} />,
    );

    const sideModalOpen = getByTestId('side-modal');
    expect(sideModalOpen).toBeInTheDocument();

    const toggleButton = getByTestId('side-modal-close-button');
    fireEvent.click(toggleButton);

    rerender(<SideModal {...defaultProps} open={false} />);

    expect(toggleDrawer).toHaveBeenCalledTimes(1);
  });

  it('applies textProps correctly', () => {
    const { getByText } = render(<SideModal {...defaultProps} />);
    const title = getByText('Test Title');
    const styles = getComputedStyle(title);

    expect(styles.fontSize).toBe('18px');
    expect(styles.fontWeight).toBe('500');
    expect(styles.color).toBe('rgb(255, 0, 0)');
    expect(styles.fontFamily).toBe("'Inter',sans-serif");
  });

  it('applies headerBackgroundColor prop correctly', () => {
    const { getByTestId } = render(<SideModal {...defaultProps} />);
    const header = getByTestId('side-modal-header');
    expect(header).toHaveStyle('background-color: blue');
  });

  it('applies closeIconColor prop correctly', () => {
    const { getByTestId } = render(<SideModal {...defaultProps} />);
    const closeButton = getByTestId('side-modal-close-button');
    expect(closeButton).toHaveStyle('color: green');
  });

  it('applies width prop correctly', () => {
    const { getByTestId } = render(<SideModal {...defaultProps} />);
    const modal = getByTestId('side-modal');
    const modalPaper = modal.getElementsByClassName('MuiDrawer-paper')[0];
    expect(modalPaper).toHaveStyle('width: 22%');
  });

  it('applies anchor prop correctly', () => {
    const { getByTestId } = render(<SideModal {...defaultProps} />);
    const modal = getByTestId('side-modal');
    const modalPaper = modal.getElementsByClassName('MuiDrawer-paper')[0];
    expect(modalPaper).toHaveClass('MuiDrawer-paperAnchorLeft');
  });

  it('applies Default anchor position if not provided', () => {
    const { getByTestId } = render(
      <SideModal {...defaultProps} anchor={undefined} />,
    );
    const modal = getByTestId('side-modal');
    const modalPaper = modal.getElementsByClassName('MuiDrawer-paper')[0];
    expect(modalPaper).toHaveClass('MuiDrawer-paperAnchorRight');
  });

  it('applies sx styles correctly', () => {
    const { getByTestId } = render(<SideModal {...defaultProps} />);

    const modal = getByTestId('side-modal');
    const styles = getComputedStyle(modal);

    expect(styles.marginTop).toBe('20px');
  });
});
