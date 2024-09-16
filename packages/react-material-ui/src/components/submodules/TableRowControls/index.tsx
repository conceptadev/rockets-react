import React from 'react';
import { Box, IconButton, Typography, Skeleton } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

type Props = {
  isLoading: boolean;
  viewIndex: number;
  rowsPerPage: number;
  currentPage: number;
  pageCount: number;
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
};

const TableRowControls = (props: Props) => {
  const {
    isLoading,
    viewIndex,
    rowsPerPage,
    currentPage,
    pageCount,
    currentIndex,
    onPrevious,
    onNext,
  } = props;

  const isPreviousDisabled =
    isLoading || (currentPage === 1 && viewIndex === 1);

  const isNextDisabled =
    isLoading || (currentPage === pageCount && viewIndex === rowsPerPage);

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
