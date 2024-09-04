import React from 'react';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#FEE2E2',
              width: '48px',
              height: '48px',
              borderRadius: '24px',
            }}
          >
            <ReportProblemOutlinedIcon
              color="error"
              sx={{ width: '24px', height: '24px' }}
            />
          </Box>
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            Alert Title
          </Typography>
          <Typography sx={{ marginTop: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
            lectus posuere, rutrum arcu non, blandit ipsum.
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="error"
            sx={{ marginRight: 2 }}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
