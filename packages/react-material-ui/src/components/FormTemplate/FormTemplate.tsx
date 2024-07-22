import React from 'react';
import Text from '../Text';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { TypographyProps } from '@mui/material/Typography';
import { ContainerProps } from '@mui/material/Container';
import { CardProps } from '@mui/material/Card';

interface FormTemplateProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  titleTextProps?: TypographyProps;
  containerProps?: ContainerProps;
  subtitleTextProps?: TypographyProps;
  cardProps?: CardProps;
}

const FormTemplate = ({
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

export default FormTemplate;
