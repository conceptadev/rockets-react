import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

/**
 * The Text component is a wrapper around the Material-UI Typography component
 * with a default fontWeight of 300.
 *
 * @see [Storybook - Text](https://storybook.rockets.tools/?path=/docs/text)
 *
 * @example
 * ```tsx
 * <Text variant="h6" fontWeight="400">
 *   Sample Text
 * </Text>
 * ```
 *
 * @param props - Typography component props
 */
const Text = (props: TypographyProps) => {
  const { children, fontWeight = '300' } = props;

  return (
    <Typography fontWeight={fontWeight} {...props}>
      {children}
    </Typography>
  );
};

export default Text;
