import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Text from '../Text';
import Avatar from '../Avatar';
import { TypographyProps } from '@mui/material/Typography';

type Props = {
  avatar?: string;
  avatarSize?: number;
  text: string;
  subText: string;
  onClick?: () => void;
  fontFamily?: TypographyProps['fontFamily'];
};

const HeaderAccount: FC<Props> = ({
  avatar,
  avatarSize = 36,
  text,
  subText,
  onClick,
  fontFamily,
}) => (
  <Box onClick={onClick} display="flex">
    {avatar && <Avatar src={avatar} alt="Avatar" size={avatarSize} />}

    <Box display="flex" flexDirection="column">
      <Text
        fontSize={14}
        fontWeight={500}
        color="text.primary"
        fontFamily={fontFamily}
      >
        {text}
      </Text>
      <Text
        fontSize={14}
        fontWeight={500}
        color="grey.600"
        fontFamily={fontFamily}
      >
        {subText}
      </Text>
    </Box>
  </Box>
);

export default HeaderAccount;
