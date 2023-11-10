import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import { Image } from './Styles';
import Text from '../Text';

type Props = {
  src: string;
  alt: string;
  size: number;
  initials?: string;
  onClick?: () => void;
};

export const Avatar: FC<Props> = (props) => {
  const { src, alt, size, initials, onClick } = props;
  const [failed, setFailed] = useState(false);

  const handleImageError = () => {
    setFailed(true);
  };

  if (failed && initials) {
    return (
      <Box sx={{ backgroundColor: 'grey.500' }}>
        <Text fontSize={30} fontWeight={800} mt={1} gutterBottom>
          {initials}
        </Text>
      </Box>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      size={size}
      onClick={onClick}
      onError={handleImageError}
      style={{ display: failed ? 'none' : 'block' }}
    />
  );
};
