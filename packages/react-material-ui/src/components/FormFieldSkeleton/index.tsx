import React, { PropsWithChildren } from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';

/**
 * FormFieldSkeleton component props.
 */
export type FormFieldSkeletonProps = {
  /** Indicates if the form field is loading */
  isLoading?: boolean;
  /** Hides the label when set to true */
  hideLabel?: boolean;
};

/**
 * The FormFieldSkeleton component is used to display a loading skeleton
 * for form fields. It shows a skeleton text area and a skeleton input
 * area when the form field is loading. The component supports options
 * to hide the label and to toggle loading state.
 *
 * @see [Storybook - FormFieldSkeleton](https://storybook.rockets.tools/?path=/docs/formfieldskeleton)
 *
 * @example
 * ```tsx
 * <FormFieldSkeleton isLoading={true} hideLabel={true}>
 *   <YourComponent />
 * </FormFieldSkeleton>
 * ```
 *
 * @param props - FormFieldSkeleton component props
 * @returns The skeleton loading component or the children if not loading
 */
export const FormFieldSkeleton = ({
  isLoading = true,
  children,
  hideLabel,
}: PropsWithChildren<FormFieldSkeletonProps>) => {
  const theme = useTheme();

  if (!isLoading) return <>{children}</>;

  return (
    <Box width="100%">
      {!hideLabel && (
        <Skeleton
          variant="text"
          width={80}
          sx={{
            fontSize: theme.typography.body1.fontSize,
          }}
          data-testid="form-field-skeleton-label"
        />
      )}
      <Skeleton
        variant="rounded"
        height={42}
        width="100%"
        data-testid="form-field-skeleton-input"
      >
        {children}
      </Skeleton>
    </Box>
  );
};
