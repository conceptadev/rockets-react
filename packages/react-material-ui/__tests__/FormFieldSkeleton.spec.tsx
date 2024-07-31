/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import FormFieldSkeleton from '../src/components/FormFieldSkeleton';
import { TextField } from '../src/components/TextField';

describe('FormFieldSkeleton Component', () => {
  it('should render correctly', () => {
    render(
      <FormFieldSkeleton isLoading={true} hideLabel={false}>
        <TextField label="Test Label" />
      </FormFieldSkeleton>,
    );
  });

  it('should render children correctly if passed', () => {
    const { getByLabelText } = render(
      <FormFieldSkeleton isLoading={false} hideLabel={false}>
        <TextField label="Test Label" name="textfield" />
      </FormFieldSkeleton>,
    );

    const input = getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });

  it('should show skeleton if "isLoading" is true', () => {
    const { container, getByTestId } = render(
      <FormFieldSkeleton isLoading={true} hideLabel={false}>
        <TextField label="Test Label" name="textfield" />
      </FormFieldSkeleton>,
    );

    const skeleton = container.querySelector('.MuiSkeleton-root');
    const labelSkeleton = getByTestId('form-field-skeleton-label');
    const inputSkeleton = getByTestId('form-field-skeleton-input');

    expect(skeleton).toBeInTheDocument();
    expect(labelSkeleton).toBeInTheDocument();
    expect(inputSkeleton).toBeInTheDocument();
  });

  it('should show label skeleton if "hideLabel" is false', () => {
    const { getByTestId } = render(
      <FormFieldSkeleton isLoading={true} hideLabel={false}>
        <TextField label="Test Label" name="textfield" />
      </FormFieldSkeleton>,
    );

    const labelSkeleton = getByTestId('form-field-skeleton-label');
    expect(labelSkeleton).toBeInTheDocument();
  });

  it('should hide label skeleton if "hideLabel" is true', () => {
    const { getByTestId, queryByTestId } = render(
      <FormFieldSkeleton isLoading={true} hideLabel={true}>
        <TextField label="Test Label" name="textfield" />
      </FormFieldSkeleton>,
    );

    const labelSkeleton = queryByTestId('form-field-skeleton-label');
    const inputSkeleton = getByTestId('form-field-skeleton-input');

    expect(labelSkeleton).not.toBeInTheDocument();
    expect(inputSkeleton).toBeInTheDocument();
  });
});
