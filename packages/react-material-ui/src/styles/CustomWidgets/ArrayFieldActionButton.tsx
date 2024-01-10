import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type Props = {
  type: 'add' | 'remove';
  onClick: () => void;
};

const ArrayFieldActionButton = (props: Props) => {
  const { type, onClick } = props;

  return (
    <Box sx={{ marginTop: 3, marginLeft: 1 }}>
      <IconButton onClick={onClick}>
        {type === 'add' ? (
          <AddCircleOutlineIcon color="primary" />
        ) : (
          <DeleteOutlineIcon />
        )}
      </IconButton>
    </Box>
  );
};

export default ArrayFieldActionButton;
