import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

/**
 * Image component props.
 */
export type ImageProps = BoxProps & {
  /** Path or URL to image file */
  src: string;
  /** Alternate attribute text */
  alt?: string;
  /** If true, the image will be displayed as a fluid element, adapting to the size of its container */
  imgFluid?: boolean;
  /** Path or URL to a fallback image */
  defaultImage?: string;
  /** Event handler for the image load event */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Event handler for the image error event */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};

/**
 * The Image component is a UI element used to display an image
 * with optional fluid resizing and error handling. It supports
 * features such as fallback to a default image on error and
 * custom event handlers for load and error events. It's props extend from
 * [Material UI's Box](https://mui.com/material-ui/api/box/#props) component props, so every prop is interchangeable between those two.
 *
 * @see {@link [MUI Box Component](https://mui.com/material-ui/react-box/)}
 * @see [Storybook - Image](https://storybook.rockets.tools/?path=/docs/image)
 *
 * @example
 * ```tsx
 * <Image
 *   src="https://example.com/nonexistent.jpg"
 *   alt="Example image"
 *   imgFluid={true}
 *   defaultImage="https://example.com/default.jpg"
 *   onLoad={(event) => console.log('Image loaded', event)}
 *   onError={(event) => console.log('Image failed to load', event)}
 * />
 * ```
 *
 * @param props - Image component props
 */
export const Image = (props: ImageProps) => {
  const { imgFluid, defaultImage, onLoad, onError, sx, ...otherProps } = props;

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
      {...otherProps}
      sx={[
        ...(imgFluid ? [{ width: '100%', height: 'auto' }] : []),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      onLoad={imageOnLoadHandler}
      onError={imageOnErrorHandler}
    />
  );
};
