import React from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';

type FormFieldSkeletonProps = {
  hideLabel?: boolean;
};

const FormFieldSkeleton = ({ hideLabel }: FormFieldSkeletonProps) => {
  const theme = useTheme();

  return (
    <Box width="100%">
      {!hideLabel && (
        <Skeleton
          variant="text"
          width={80}
          sx={{
            fontSize: theme.typography.body1.fontSize,
          }}
        />
      )}
      <Skeleton variant="rounded" height={42} width="100%" />
    </Box>
  );
};

export default FormFieldSkeleton;
