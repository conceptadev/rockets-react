import React, { FC } from 'react';
import { Box, BoxProps } from '@mui/material';

type Props = {
  src: string;
  alt?: string;
  imgFluid?: boolean;
  defaultImage?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};

const Image: FC<BoxProps & Props> = (props) => {
  const { imgFluid, defaultImage, onLoad, onError, sx } = props;

  const imageOnLoadHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    onLoad?.(event);
  };

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    onError?.(event);
    if (defaultImage) {
      event.currentTarget.src = defaultImage;
    }
  };

  return (
    <Box
      component="img"
      {...props}
      sx={{ ...(imgFluid && { width: '100%', height: 'auto' }), ...sx }}
      onLoad={imageOnLoadHandler}
      onError={imageOnErrorHandler}
    />
  );
};

export default Image;
