import React from 'react';
import { Box, IconButton, Typography, Skeleton } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

type Props = {
  isLoading: boolean;
  currentIndex: number;
  rowsPerPage: number;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

const TableRowControls = (props: Props) => {
  const {
    isLoading,
    currentIndex,
    rowsPerPage,
    isPreviousDisabled,
    isNextDisabled,
    onPrevious,
    onNext,
  } = props;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton onClick={onPrevious} disabled={isPreviousDisabled}>
        <ChevronLeft sx={{ color: '#333' }} />
      </IconButton>
      <Typography sx={{ textTransform: 'uppercase', fontSize: '0.875rem' }}>
        {isLoading ? (
          <Skeleton
            variant="text"
            sx={{ fontSize: '0.875rem' }}
            width={58}
            height={22}
          />
        ) : (
          `Row ${currentIndex}/${rowsPerPage}`
        )}
      </Typography>
      <IconButton onClick={onNext} disabled={isNextDisabled}>
        <ChevronRight sx={{ color: '#333' }} />
      </IconButton>
    </Box>
  );
};

export default TableRowControls;
