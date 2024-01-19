/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import FormLabel from '../src/components/FormLabel';

describe('FormLabel Component', () => {
  it('should render correctly', () => {
    render(<FormLabel name="formField" label="Test Label" />);
  });

  it('should have id param if id is passed', () => {
    const { container } = render(
      <FormLabel id="testId" name="formField" label="Test Label" />,
    );
    const label = container.querySelector('label');
    expect(label).toHaveAttribute('id', 'testId');
  });

  it('should have for="name" param if name is passed', () => {
    const { container } = render(
      <FormLabel id="testId" name="formField" label="Test Label" />,
    );
    const label = container.querySelector('label');
    expect(label).toHaveAttribute('for', 'formField');
  });

  it('should have for="name" param if name is passed', () => {
    const { container } = render(
      <FormLabel id="testId" name="formField" label="Test Label" />,
    );
    const label = container.querySelector('label');
    expect(label).toHaveAttribute('for', 'formField');
  });

  it('should render correct label passed', () => {
    const { getByText } = render(
      <FormLabel id="testId" name="formField" label="Test Label" />,
    );
    const label = getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('should render correct label passed', () => {
    const { getByText } = render(
      <FormLabel id="testId" name="formField" label="Test Label" required />,
    );
    const label = getByText('Test Label *');
    expect(label).toBeInTheDocument();
  });

  it('should apply custom styles if labelProps are passed', () => {
    const { getByText } = render(
      <FormLabel
        id="testId"
        name="formField"
        label="Test Label"
        labelProps={{
          fontFamily: 'Open Sans',
          fontSize: 60,
          fontWeight: 800,
          color: 'green',
          lineHeight: 20,
        }}
      />,
    );
    const label = getByText('Test Label');

    expect(label).toHaveStyle('font-family: Open Sans');
    expect(label).toHaveStyle('font-size: 60px');
    expect(label).toHaveStyle('font-weight: 800');
    expect(label).toHaveStyle('color: green');
    expect(label).toHaveStyle('line-height: 20');
  });
});
