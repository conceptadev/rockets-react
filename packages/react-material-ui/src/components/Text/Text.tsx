import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

/**
 * The Text component is a wrapper around the Material-UI Typography component
 * with a default fontWeight of 300. It's props extend from [Material UI's Typography](https://mui.com/material-ui/api/Typography/#props)
 * component props, so every prop is interchangeable between those two.
 *
 * @see {@link [MUI Typography Component](https://mui.com/material-ui/react-typography/)}
 * @see [Storybook - Text](https://storybook.rockets.tools/?path=/docs/text)
 *
 * @example
 * ```tsx
 * <Text variant="h6" fontWeight="400" fontSize='18px'>
 *   Sample Text
 * </Text>
 * ```
 *
 * @param typographyProps - MUI {@link [TypographyProps](https://mui.com/material-ui/api/Typography/#props)}
 */
const Text = (typographyProps: TypographyProps) => {
  const { children, fontWeight = '300' } = typographyProps;

  return (
    <Typography fontWeight={fontWeight} {...typographyProps}>
      {children}
    </Typography>
  );
};

export default Text;
