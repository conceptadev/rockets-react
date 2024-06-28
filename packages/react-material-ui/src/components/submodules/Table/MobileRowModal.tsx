'use client';

import React from 'react';
import get from 'lodash/get';
import { Tooltip, Box, Dialog, DialogContent, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import Text from '../../Text';
import { CustomTableCell, RowProps } from '../../Table/types';
import { useTableRoot } from '../../Table/hooks/useTableRoot';

interface Props {
  currentRow: RowProps | null;
  onClose: () => void;
  titleSrc?: string;
}

const getCellData = (row: RowProps, dataOrigin: string) => {
  const cell: CustomTableCell | string | number | undefined = get(
    row,
    dataOrigin,
  );

  if (!cell) return '';

  if (
    typeof cell === 'number' ||
    typeof cell === 'string' ||
    typeof cell === 'undefined'
  ) {
    return (
      <Text fontSize={14} fontWeight={400} color="text.primary">
        {cell ?? ''}
      </Text>
    );
  }

  if ('component' in cell) {
    return cell.component;
  }

  if ('title' in cell) {
    return (
      <Tooltip title={cell.title}>
        <span>{cell.value ?? ''}</span>
      </Tooltip>
    );
  }

  return (
    <Text fontSize={14} fontWeight={400} color="text.primary">
      {cell.value ?? ''}
    </Text>
  );
};

const MobileRowModal = ({ currentRow, onClose, titleSrc }: Props) => {
  const { headers } = useTableRoot();

  return (
    <Dialog open={!!currentRow} fullWidth onClose={onClose}>
      <Box display="flex" justifyContent="space-between">
        {titleSrc &&
          currentRow?.[titleSrc] &&
          typeof currentRow[titleSrc] === 'string' && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 3,
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <Text
                fontSize={14}
                fontWeight={400}
                color="text.primary"
                sx={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentRow[titleSrc] as string}
              </Text>
            </Box>
          )}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ display: 'block' }}>
        <Box>
          {headers?.map((header) => {
            if (header.hide || !header.label) return null;

            return (
              <Box
                key={header.id}
                display="flex"
                sx={{ mb: 2, alignItems: 'center' }}
              >
                <Box
                  sx={{
                    display: 'block',
                    alignItems: 'center',
                    fontSize: 12,
                    width: 70,
                    minWidth: 70,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    paddingRight: '3px',
                    borderRight: '1px solid #ccc',

                    p: {
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      fontSize: 12,
                    },
                  }}
                >
                  {header.label}
                </Box>
                <Box
                  sx={{
                    display: 'block',
                    alignItems: 'center',
                    fontSize: 12,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    paddingLeft: '6px',

                    '& p': {
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      fontSize: '12px !important',
                    },
                  }}
                >
                  {getCellData(currentRow, header.source || header.id)}
                </Box>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MobileRowModal;
