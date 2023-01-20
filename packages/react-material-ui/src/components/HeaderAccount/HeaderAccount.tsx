import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Text from '../Text';
import Avatar from '../Avatar';
import { TextProps } from 'interfaces';

type Props = {
  avatar?: string;
  avatarSize?: number;
  text: string;
  subText: string;
  onClick?: () => void;
  textProps?: TextProps;
};

const HeaderAccount: FC<Props> = ({
  avatar,
  avatarSize = 36,
  text,
  subText,
  onClick,
  textProps = {
    fontSize: 14,
    fontWeight: 500,
    color: 'text.primary',
  },
}) => (
  <Box onClick={onClick} display="flex">
    {avatar && <Avatar src={avatar} alt="Avatar" size={avatarSize} />}

    <Box display="flex" flexDirection="column">
      <Text textProps={textProps}>{text}</Text>
      <Text textProps={textProps}>{subText}</Text>
    </Box>
  </Box>
);

export default HeaderAccount;
