import React from 'react';
import IconButton from '@mui/material/IconButton';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import Badge from '@mui/material/Badge';

/**
 * Notifications component props.
 */
export type NotificationsProps = {
  /** Number of notifications */
  amount: number;
  /** Custom `onClick` handler */
  onClick?: () => void;
};

/**
 * The Notifications component is a UI element used to display a notification icon
 * with a badge showing the number of notifications. It supports customization
 * for click handling and styling.
 *
 * @see [Storybook - Notifications](https://storybook.rockets.tools/?path=/docs/notifications)
 *
 * @example
 * ```tsx
 * <Notifications
 *   amount={5}
 *   onClick={() => alert('Notification icon clicked')}
 * />
 * ```
 *
 * @param props - Notifications component props
 */
export const Notifications = ({ amount, onClick }: NotificationsProps) => (
  <IconButton sx={{ color: 'text.secondary' }} onClick={onClick}>
    <Badge badgeContent={amount} color="error" data-testid="badge">
      <NotificationsOutlined />
    </Badge>
  </IconButton>
);
