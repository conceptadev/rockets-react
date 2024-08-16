import React from 'react';
import Text from '../Text';
import {
  Card,
  Container,
  TypographyProps,
  ContainerProps,
  CardProps,
} from '@mui/material';

/**
 * Props for the `FormTemplate` component.
 */
export interface FormTemplateProps {
  /** The title text displayed at the top of the form. */
  title?: string;
  /** The subtitle text displayed below the title. */
  subtitle?: string;
  /** An optional icon to display above the title. */
  icon?: React.ReactNode;
  /** Child components or elements (your form) to render inside the form card. */
  children?: React.ReactNode;
  /** Props to customize the text component for the title. */
  titleTextProps?: TypographyProps;
  /** Props to customize the `Container` component that wraps the form. */
  containerProps?: ContainerProps;
  /** Props to customize the text component for the subtitle. */
  subtitleTextProps?: TypographyProps;
  /** Props to customize the `Card` component that contains the children. */
  cardProps?: CardProps;
}

/**
 * The `FormTemplate` component provides a structured layout for forms,
 * including an optional title, subtitle, icon, and children content. It
 * utilizes Material-UI's `Container` and `Card` components to organize
 * the content and allows for extensive customization via props.
 *
 * @see [Storybook - FormTemplate](https://storybook.rockets.tools/?path=/docs/formtemplate)
 *
 * @example
 * ```tsx
 * <FormTemplate
 *   title="Login"
 *   subtitle="Please enter your credentials"
 *   icon={<LoginIcon />}
 *   containerProps={{ sx: { backgroundColor: '#f0f0f0' } }}
 *   cardProps={{ sx: { padding: '20px' } }}
 * >
 *   <LoginForm />
 * </FormTemplate>
 * ```
 *
 * @param props - Props for the `FormTemplate` component
 * @see [MuiContainerProps](https://mui.com/material-ui/api/container/#props)
 * @see [MuiCardProps](https://mui.com/material-ui/api/card/#props)
 */
export const FormTemplate = ({
  title,
  subtitle,
  icon,
  children,
  titleTextProps,
  containerProps,
  subtitleTextProps,
  cardProps,
}: FormTemplateProps) => {
  return (
    <Container
      maxWidth="xs"
      {...containerProps}
      sx={[
        {
          textAlign: 'center',
          padding: '48px 0',
        },
        ...(Array.isArray(containerProps?.sx)
          ? containerProps.sx
          : [containerProps?.sx]),
      ]}
    >
      {icon && icon}
      {title && (
        <Text
          fontFamily="Inter"
          fontSize={30}
          fontWeight={800}
          mt={1}
          gutterBottom
          {...titleTextProps}
        >
          {title}
        </Text>
      )}

      {subtitle && (
        <Text fontSize={14} fontWeight={500} {...subtitleTextProps}>
          {subtitle}
        </Text>
      )}
      <Card
        {...cardProps}
        sx={[
          {
            marginTop: '26px',
            padding: '24px 24px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
          ...(Array.isArray(cardProps?.sx) ? cardProps.sx : [cardProps?.sx]),
        ]}
      >
        {children}
      </Card>
    </Container>
  );
};
