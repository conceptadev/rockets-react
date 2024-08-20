import React from 'react';
import MuiLink, { LinkProps } from '@mui/material/Link';

export type { LinkProps };

/**
 * The `Link` component is a wrapper around the MUI `Link` component with
 * additional customization for default color and styles. It's props extend from [Material UI's Link](https://mui.com/material-ui/api/link/#props)
 * component props, so every prop is interchangeable between those two.
 *
 * @see [Storybook - Link](https://storybook.rockets.tools/?path=/docs/link)
 *
 * @example
 * ```tsx
 * <Link href="https://example.com" color="secondary.main">
 *   Visit Example
 * </Link>
 * ```
 *
 * @see [MUI Link](https://mui.com/api/link/)
 * @param linkProps - MUI {@link [LinkProps](https://mui.com/material-ui/api/link/#props)}
 */
export const Link = (props: LinkProps) => {
  const { children, color = 'primary.dark', sx } = props;

  return (
    <MuiLink
      color={color}
      {...props}
      sx={[
        {
          textDecoration: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </MuiLink>
  );
};
