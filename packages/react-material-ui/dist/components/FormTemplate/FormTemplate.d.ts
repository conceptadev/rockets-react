import React from 'react';
import { TypographyProps, ContainerProps, CardProps } from '@mui/material';
export interface FormTemplateProps {
    title?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    titleTextProps?: TypographyProps;
    containerProps?: ContainerProps;
    subtitleTextProps?: TypographyProps;
    cardProps?: CardProps;
}
export declare const FormTemplate: ({ title, subtitle, icon, children, titleTextProps, containerProps, subtitleTextProps, cardProps, }: FormTemplateProps) => JSX.Element;
