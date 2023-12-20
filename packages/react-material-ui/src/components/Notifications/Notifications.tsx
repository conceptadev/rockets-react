import React from 'react';
import IconButton from '@mui/material/IconButton';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import Badge from '@mui/material/Badge';

type Props = {
  amount: number;
  onClick?: () => void;
};

const Notifications = ({ amount, onClick }: Props) => (
  <IconButton sx={{ color: 'text.secondary' }} onClick={onClick}>
    <Badge badgeContent={amount} color="error" data-testid="badge">
      <NotificationsOutlined />
    </Badge>
  </IconButton>
);

export default Notifications;
