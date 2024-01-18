import React, { PropsWithChildren } from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';

type FormFieldSkeletonProps = {
  isLoading?: boolean;
  hideLabel?: boolean;
};

const FormFieldSkeleton = ({
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

export default FormFieldSkeleton;
