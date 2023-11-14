import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import { Image } from './Styles';
import Text from '../Text';

type Props = {
  src?: string;
  alt?: string;
  size?: number;
  initials?: string;
  onClick?: () => void;
  backgroundColor?: string;
};

export const Avatar: FC<Props> = (props) => {
  const { src, alt, size = 30, initials, backgroundColor, onClick } = props;
  const [failed, setFailed] = useState(!src);

  const handleImageError = () => {
    setFailed(true);
  };

  const showInitials = failed && initials;

  return (
    <Box
      sx={
        showInitials
          ? {}
          : {
              backgroundColor: backgroundColor || '#eee',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
      }
    >
      <Image
        src={src}
        alt={alt}
        size={size}
        onClick={onClick}
        onError={handleImageError}
        style={{ display: showInitials ? 'none' : 'block' }}
      />
      {showInitials && (
        <Text fontSize={size * 0.44} fontWeight={600}>
          {initials.substring(0, 2)}
        </Text>
      )}
    </Box>
  );
};

export default Avatar;
