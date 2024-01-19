/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Table } from '../src/components/Table/Table';

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

describe('Table component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<Table />);
    const table = getByTestId('mui-table');
    expect(table).toBeInTheDocument();
  });

  it('should render the table with the specified variant', () => {
    const { getByTestId } = render(
      <Table variant="clean">
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell data-testid="header">Header</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell data-testid="body">Body</TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </Table>,
    );
    const header = getByTestId('header');
    const body = getByTestId('body');
    const headerStyles = getComputedStyle(header);
    const bodyStyles = getComputedStyle(body);

    expect(headerStyles.border).toBeFalsy();
    expect(bodyStyles.border).toBeFalsy();
    expect(bodyStyles.borderLeft).toBeFalsy();
    expect(bodyStyles.borderRight).toBeFalsy();
  });

  it('should render the table with the default variant if no variant is provided', () => {
    const { getByTestId } = render(
      <Table>
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell data-testid="header">Header</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell data-testid="body">Body</TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </Table>,
    );
    const header = getByTestId('header');
    const body = getByTestId('body');
    const headerStyles = getComputedStyle(header);
    const bodyStyles = getComputedStyle(body);

    expect(headerStyles.border).toBeFalsy();
    expect(bodyStyles.border).toBeTruthy();
    expect(bodyStyles.borderLeftStyle).toBeTruthy();
    expect(bodyStyles.borderRightStyle).toBeTruthy();
  });

  it('should render the table with the default minimum width', () => {
    const { getByTestId } = render(<Table />);
    const table = getByTestId('mui-table');

    expect(table).toHaveStyle('min-width: 750px');
  });

  it('should render the table with the specified minimum width', () => {
    const { getByTestId } = render(<Table sx={{ minWidth: 500 }} />);
    const table = getByTestId('mui-table');

    expect(table).toHaveStyle('min-width: 500px');
  });

  it('should pass the sx prop to the component when provided', () => {
    const { getByTestId } = render(<Table sx={{ color: 'red' }} />);
    const table = getByTestId('mui-table');

    expect(table).toHaveStyle('color: red');
  });
});
